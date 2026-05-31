import { Booking } from '../types';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  size?: string;
  createdTime: string;
}

/**
 * List files from user's Google Drive.
 */
export async function listDriveFiles(accessToken: string): Promise<DriveFile[]> {
  const url = 'https://www.googleapis.com/drive/v3/files?pageSize=20&orderBy=createdTime desc&fields=files(id,name,mimeType,webViewLink,size,createdTime)';
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to list Drive files: ${response.statusText} (${errorText})`);
  }

  const data = await response.json();
  return data.files || [];
}

/**
 * Upload backup of bookings to Google Drive using multipart upload.
 */
export async function uploadBackupToDrive(
  accessToken: string,
  bookings: Booking[],
  filename: string = 'Annai_AC_Bookings_Report.json'
): Promise<DriveFile> {
  const metadata = {
    name: filename,
    mimeType: 'application/json',
    description: 'Backup of AC Repair & Service log from Annai AC Service portal'
  };

  const fileContent = JSON.stringify({
    exportedAt: new Date().toISOString(),
    totalBookings: bookings.length,
    bookings
  }, null, 2);

  const boundary = 'annaiacserviceboundary123';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const body =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: application/json\r\n\r\n' +
    fileContent +
    closeDelimiter;

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,size,createdTime', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: body
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to upload file to Google Drive: ${response.statusText} (${errorText})`);
  }

  return response.json();
}

/**
 * Delete a file from Google Drive.
 */
export async function deleteDriveFile(accessToken: string, fileId: string): Promise<boolean> {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete file from Google Drive: ${response.statusText} (${errorText})`);
  }

  return true;
}

/**
 * Upload any User file to Google Drive (PDF manual, Image, etc).
 */
export async function uploadCustomFileToDrive(
  accessToken: string,
  file: File
): Promise<DriveFile> {
  const metadata = {
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
    description: 'Uploaded via Annai AC Service Console'
  };

  const boundary = 'annaiacserviceboundary123';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  // Read file as ArrayBuffer, then form request
  const reader = new FileReader();
  const fileDataPromise = new Promise<ArrayBuffer>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });

  const fileArrayBuffer = await fileDataPromise;
  const headerContent =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${file.type || 'application/octet-stream'}\r\n\r\n`;

  const footerContent = closeDelimiter;

  const encoder = new TextEncoder();
  const headerUint8 = encoder.encode(headerContent);
  const footerUint8 = encoder.encode(footerContent);

  const totalLength = headerUint8.byteLength + fileArrayBuffer.byteLength + footerUint8.byteLength;
  const combinedBuffer = new Uint8Array(totalLength);

  combinedBuffer.set(headerUint8, 0);
  combinedBuffer.set(new Uint8Array(fileArrayBuffer), headerUint8.byteLength);
  combinedBuffer.set(footerUint8, headerUint8.byteLength + fileArrayBuffer.byteLength);

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,size,createdTime', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: combinedBuffer
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to upload custom file: ${response.statusText} (${errorText})`);
  }

  return response.json();
}
