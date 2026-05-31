import React, { useState, useEffect, useRef } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken
} from '../lib/firebase';
import {
  listDriveFiles,
  uploadBackupToDrive,
  deleteDriveFile,
  uploadCustomFileToDrive,
  DriveFile
} from '../lib/drive';
import { Booking } from '../types';
import {
  Cloud,
  CloudUpload,
  Trash2,
  Loader2,
  FileText,
  Clock,
  Search,
  ExternalLink,
  ShieldCheck,
  LogOut,
  Sparkles,
  FileSpreadsheet,
  FileCode,
  Image,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

interface DriveConsoleProps {
  bookings: Booking[];
}

export default function DriveConsole({ bookings }: DriveConsoleProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isUploadingBackup, setIsUploadingBackup] = useState(false);
  const [isUploadingCustom, setIsUploadingCustom] = useState(false);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);

  // File input ref for uploading custom manual
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom modal state for interactive delete confirmations
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Load auth state listening
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        setNeedsAuth(false);
        loadFiles(currentToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
        setFiles([]);
      }
    );

    return () => unsubscribe();
  }, []);

  const loadFiles = async (accessToken: string) => {
    setIsLoadingFiles(true);
    setErrorStatus(null);
    try {
      const driveFiles = await listDriveFiles(accessToken);
      setFiles(driveFiles);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(`Could not pull files from Google Drive: ${err.message || err}`);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setErrorStatus(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
        loadFiles(result.accessToken);
        setSuccessStatus('Successfully connected to Google Drive!');
        setTimeout(() => setSuccessStatus(null), 4000);
      }
    } catch (err: any) {
      console.error(err);
      setErrorStatus(`Login alignment failed: ${err.message || err}`);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setNeedsAuth(true);
      setFiles([]);
      setSuccessStatus('Signed out from Google Drive.');
      setTimeout(() => setSuccessStatus(null), 4000);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(`Logout sequence failure: ${err.message || err}`);
    }
  };

  const handleBackupToDrive = async () => {
    if (!token) return;
    setIsUploadingBackup(true);
    setErrorStatus(null);
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `Annai_AC_Bookings_Backup_${timestamp}.json`;
      const uploaded = await uploadBackupToDrive(token, bookings, filename);
      
      setSuccessStatus(`Booking list backed up successfully to Google Drive as "${uploaded.name}"!`);
      setTimeout(() => setSuccessStatus(null), 5000);
      
      // Reload explorer list
      loadFiles(token);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(`Export operation failed: ${err.message || err}`);
    } finally {
      setIsUploadingBackup(false);
    }
  };

  const handleCustomFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!token || !e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploadingCustom(true);
    setErrorStatus(null);
    try {
      const uploaded = await uploadCustomFileToDrive(token, file);
      setSuccessStatus(`Successfully uploaded diagnostic file: "${uploaded.name}"!`);
      setTimeout(() => setSuccessStatus(null), 5000);
      
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      // Reload explorer list
      loadFiles(token);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(`Upload failed: ${err.message || err}`);
    } finally {
      setIsUploadingCustom(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!token || !showDeleteConfirm) return;
    const { id, name } = showDeleteConfirm;
    setIsDeletingId(id);
    setErrorStatus(null);
    try {
      await deleteDriveFile(token, id);
      setSuccessStatus(`"${name}" was permanently removed from Google Drive.`);
      setTimeout(() => setSuccessStatus(null), 4000);
      
      // Reload lists
      loadFiles(token);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(`Delete failed: ${err.message || err}`);
    } finally {
      setIsDeletingId(null);
      setShowDeleteConfirm(null);
    }
  };

  const formatSize = (bytesStr?: string) => {
    if (!bytesStr) return '—';
    const bytes = parseInt(bytesStr, 10);
    if (isNaN(bytes)) return '—';
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('json')) {
      return <FileCode size={16} className="text-[#00ffaa]" />;
    }
    if (mimeType.includes('image')) {
      return <Image size={16} className="text-[#00e5ff]" />;
    }
    if (mimeType.includes('spreadsheet') || mimeType.includes('csv')) {
      return <FileSpreadsheet size={16} className="text-emerald-400" />;
    }
    return <FileText size={16} className="text-slate-400" />;
  };

  const filteredFiles = files.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="glass border border-[#00ffd2]/10 rounded-2xl p-6 relative overflow-hidden mt-8 bg-gradient-to-br from-black/60 to-white/3" id="drive-integration">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header and status info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-4 border-b border-white/5">
        <div>
          <h3 className="font-orbitron font-bold text-base text-[#00e5ff] flex items-center gap-2">
            <Cloud size={20} className="animate-pulse" />
            Google Drive Customer Console
          </h3>
          <p className="text-[10px] text-[#8a95aa] mt-1">
            Back up client tickets, store repair diagnostic photos, or access your official invoices securely with your private Google Drive space.
          </p>
        </div>

        {/* User Account Controls */}
        {user && (
          <div className="flex items-center gap-3.5 bg-white/3 border border-white/5 rounded-xl px-4 py-2 self-start md:self-auto">
            {user.photoURL ? (
              <img
                referrerPolicy="no-referrer"
                src={user.photoURL}
                alt={user.displayName || 'Google user'}
                className="w-8 h-8 rounded-full border border-[#00e5ff]/30 shadow"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 flex items-center justify-center font-bold text-xs uppercase font-orbitron">
                {user.displayName?.charAt(0) || 'G'}
              </div>
            )}
            <div className="text-left">
              <span className="text-[10px] font-bold text-white block truncate max-w-[120px]">
                {user.displayName || 'Google Account'}
              </span>
              <span className="text-[8px] text-[#8a95aa] block truncate max-w-[120px]">
                {user.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1.5 rounded-lg transition-colors cursor-pointer"
              title="Disconnect Account"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Global Status Notifications */}
      {errorStatus && (
        <div className="mb-5 bg-red-950/40 border border-red-500/20 rounded-xl p-3 flex items-start gap-2.5 text-xs text-red-300 animate-fade-in">
          <AlertTriangle size={15} className="shrink-0 mt-0.5 text-red-400" />
          <span>{errorStatus}</span>
        </div>
      )}

      {successStatus && (
        <div className="mb-5 bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-300 animate-fade-in">
          <ShieldCheck size={15} className="shrink-0 mt-0.5 text-[#00ffaa]" />
          <span>{successStatus}</span>
        </div>
      )}

      {/* Non-Authenticated State -> Sign-In Needed */}
      {needsAuth ? (
        <div className="py-10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#00e5ff]/5 border border-[#00e5ff]/10 flex items-center justify-center text-[#00e5ff] mb-4">
            <Cloud size={28} className="animate-pulse" />
          </div>
          <h4 className="text-sm font-semibold tracking-wide text-white/90 mb-1 font-orbitron uppercase">
            Drive Authorization Required
          </h4>
          <p className="text-xs text-[#8a95aa] max-w-[420px] mb-6 leading-relaxed">
            By connecting Google Drive, you can write active booking sheets, upload photos of AC damage, and manage files under your own file storage safely.
          </p>

          {/* Styled gsi-material-button matching Official Google brand guidelines */}
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="group relative flex items-center justify-center gap-3 bg-[#0d1527] hover:bg-[#15223e] active:bg-[#080d19] border border-white/10 hover:border-[#00e5ff]/30 py-3 px-5 rounded-xl transition-all duration-300 text-xs font-orbitron font-extrabold text-[#eef2ff] hover:text-[#00e5ff] cursor-pointer disabled:opacity-50 disabled:pointer-events-none hover:shadow-[0_0_15px_rgba(0,229,255,0.15)]"
          >
            {isLoggingIn ? (
              <>
                <Loader2 size={16} className="animate-spin text-[#00e5ff]" />
                Initializing Connection...
              </>
            ) : (
              <>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 shadow-sm transform group-hover:scale-105 transition-transform" style={{ display: 'block' }}>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
                Connect Google Account
              </>
            )}
          </button>
        </div>
      ) : (
        /* Authenticated State -> Operations Center */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Quick Actions Panel */}
            <div className="lg:col-span-5 bg-black/40 border border-white/5 rounded-xl p-5 space-y-4">
              <h4 className="font-orbitron font-bold text-xs text-white/90 tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#00e5ff]" />
                Command Center
              </h4>

              {/* 1. Export Active Bookings Backup */}
              <div className="space-y-2">
                <p className="text-[10px] text-[#8a95aa] leading-relaxed">
                  Export and store all active bookings currently stored in the portal to Google Drive.
                </p>
                <button
                  onClick={handleBackupToDrive}
                  disabled={isUploadingBackup || bookings.length === 0}
                  className="w-full bg-[#00ffaa]/10 border border-[#00ffaa]/20 hover:border-[#00ffaa]/60 text-[#00ffaa] hover:bg-[#00ffaa] hover:text-black py-2 px-3.5 rounded-lg flex items-center justify-center gap-2 font-orbitron font-bold text-[10px] tracking-wide uppercase transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isUploadingBackup ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      Creating Backup File...
                    </>
                  ) : (
                    <>
                      <CloudUpload size={13} />
                      Export Current {bookings.length} {bookings.length === 1 ? 'Booking' : 'Bookings'}
                    </>
                  )}
                </button>
                {bookings.length === 0 && (
                  <p className="text-[8px] text-amber-400 font-mono italic">
                    * Booking list is currently empty. Add bookings above to enable backups.
                  </p>
                )}
              </div>

              {/* 2. Upload Custom Repair Document / Photo */}
              <div className="space-y-2 pt-3 border-t border-white/5">
                <span className="text-[10px] font-semibold text-white/80 block">Upload AC File/Image</span>
                <p className="text-[10px] text-[#8a95aa] leading-relaxed">
                  Store diagnostic manual, bills, warranty or repair photos directly.
                </p>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleCustomFileUpload}
                    accept="image/*,application/pdf,text/*,application/json"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingCustom}
                    className="flex-1 bg-white/5 hover:bg-white/10 active:bg-white/3 border border-white/10 rounded-lg py-2 px-3 flex items-center justify-center gap-2 font-orbitron font-bold text-[10px] text-white tracking-wide uppercase transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                  >
                    {isUploadingCustom ? (
                      <>
                        <Loader2 size={13} className="animate-spin text-[#00e5ff]" />
                        Uploading File...
                      </>
                    ) : (
                      <>
                        <CloudUpload size={13} className="text-[#00e5ff]" />
                        Select & Upload
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Google Drive Files List - Explorer */}
            <div className="lg:col-span-7 bg-black/40 border border-white/5 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-orbitron font-bold text-xs text-white/90 tracking-wider uppercase">
                  Drive File Explorer
                </h4>
                <button
                  onClick={() => loadFiles(token!)}
                  disabled={isLoadingFiles}
                  className="text-[#00e5ff] hover:text-white p-1 rounded transition-colors disabled:opacity-50 cursor-pointer"
                  title="Refresh Drive List"
                >
                  <RefreshCw size={13} className={isLoadingFiles ? 'animate-spin' : ''} />
                </button>
              </div>

              {/* Search Bar Filter */}
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search backups and assets..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/60 border border-white/10 focus:border-[#00e5ff]/40 rounded-lg py-1.5 pl-8.5 pr-4 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              {/* Files Table / Explorer view */}
              <div className="overflow-y-auto max-h-[220px] rounded-lg border border-white/5 bg-slate-950/30 scrollbar-thin scrollbar-thumb-white/15">
                {isLoadingFiles ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <Loader2 size={20} className="animate-spin text-[#00e5ff] mb-2" />
                    <span className="text-[10px] text-[#8a95aa]">Reading files in Google Drive...</span>
                  </div>
                ) : filteredFiles.length === 0 ? (
                  <div className="py-12 text-center text-xs text-[#8a95aa]">
                    No files found matching filter. Try backing up bookings!
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/2 text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                        <th className="p-2 pl-3">Name</th>
                        <th className="p-2">Size</th>
                        <th className="p-2">Created</th>
                        <th className="p-2 pr-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredFiles.map(file => (
                        <tr key={file.id} className="hover:bg-white/2 text-[11px] transition-colors group">
                          {/* File Name + Icon */}
                          <td className="p-2 pl-3 font-medium text-white/90">
                            <div className="flex items-center gap-2 max-w-[170px] sm:max-w-xs md:max-w-[200px] truncate">
                              {getFileIcon(file.mimeType)}
                              <span title={file.name} className="truncate">{file.name}</span>
                            </div>
                          </td>
                          {/* File Size */}
                          <td className="p-2 text-[#8a95aa] font-mono text-[10px]">
                            {formatSize(file.size)}
                          </td>
                          {/* Created Date */}
                          <td className="p-2 text-[#8a95aa] font-mono text-[9px]">
                            {new Date(file.createdTime).toLocaleDateString()}
                          </td>
                          {/* Action Items */}
                          <td className="p-2 pr-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#00e5ff] hover:text-[#00ffaa] p-1.5 rounded bg-white/3 hover:bg-white/10 transition-all flex items-center justify-center shrink-0"
                                  title="Open in Drive"
                                >
                                  <ExternalLink size={11} />
                                </a>
                              )}
                              <button
                                onClick={() => setShowDeleteConfirm({ id: file.id, name: file.name })}
                                className="text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-red-500/10 transition-all shrink-0 cursor-pointer"
                                title="Remove File"
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Confirmation Dialog for Destructive Delete (Adhering strictly to User Confirmation rules) */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0b121f] border border-red-500/30 rounded-2xl p-6 max-w-sm w-full space-y-4 animate-scale-up shadow-2xl">
            <div className="flex items-center gap-3 text-red-400 pb-2 border-b border-white/5">
              <AlertTriangle size={20} className="shrink-0" />
              <h5 className="font-orbitron font-extrabold text-xs tracking-wider uppercase">
                Confirm Destruction
              </h5>
            </div>
            
            <p className="text-xs text-[#8a95aa] leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-white">"{showDeleteConfirm.name}"</strong> from your Google Drive? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                disabled={isDeletingId !== null}
                className="bg-white/5 hover:bg-white/10 text-white font-orbitron font-bold text-[10px] px-3.5 py-2 rounded-lg cursor-pointer transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeletingId !== null}
                className="bg-red-600 hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] text-white font-orbitron font-bold text-[10px] px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
              >
                {isDeletingId ? (
                  <>
                    <Loader2 size={11} className="animate-spin" />
                    Removing...
                  </>
                ) : (
                  <>
                    <Trash2 size={11} />
                    Confirm Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
