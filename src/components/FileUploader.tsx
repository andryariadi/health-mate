"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { LuUploadCloud } from "react-icons/lu";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  console.log({ files, onChange, onDrop, getRootProps, getInputProps, isDragActive }, "<---difileUploader");

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />

      {files && files.length > 0 ? (
        <Image src={convertFileToUrl(files[0])} alt="Image Uploader" width={1000} height={1000} className="max-h-[400px] object-cover overflow-hidden" />
      ) : (
        <>
          <LuUploadCloud size={50} className="text-green-500 hover:scale-110 transition-all duration-300 p-2 bg-gray-800 rounded-full border border-gray-700" />
          <div className="file-upload_label">
            <p className="text-14-regular ">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
