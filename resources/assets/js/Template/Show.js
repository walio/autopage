import React from 'react';
import { Upload, Icon } from 'antd';

export default ({ fetch, data }) => {
    if (!data) {
        fetch('/template');
        return null;
    }
    return (
        <Upload.Dragger
            action="/template"
            defaultFileList={data.map((file, index) => ({
                uid: index + 1,
                status: 'done',
                name: file,
                url: `/template/${file}?api_token=${window.localStorage.s}`,
            }))}
            headers={{
                'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,
                Authorization: `Bearer ${window.localStorage.s}`,
            }}
        >
            <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">将文件拖拽至此处上传</p>
        </Upload.Dragger>
    );
};
