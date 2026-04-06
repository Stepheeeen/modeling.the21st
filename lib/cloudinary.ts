// We are using unsigned uploads with an upload preset, so API KEY and SECRET are not required.

export const uploadToCloudinary = async (file: File | string, folder: string) => {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary configuration is missing');
    }

    const formData = new FormData();
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', `t21-agency/${folder}`);

    if (typeof file === 'string') {
      formData.append('file', file);
    } else {
      formData.append('file', file);
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};


export default uploadToCloudinary;
