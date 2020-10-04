import React from 'react';
import './FileInfo.scss';

export const FileInfo = ({ file }) => {
  debugger;
  function fileSize(size) {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 +
      ' ' +
      ['B', 'kB', 'MB', 'GB', 'TB'][i]
    );
  }

  return (
    <>
      {file && (
        <div className='list-group'>
          <div className='list-group-item'>
            <span>File name:</span> {file.name}
          </div>
          <div className='list-group-item'>
            <span>File type:</span> {file.type}
          </div>
          <div className='list-group-item'>
            <span>File size:</span> {fileSize(file.size)}
          </div>
        </div>
      )}
    </>
  );
};
