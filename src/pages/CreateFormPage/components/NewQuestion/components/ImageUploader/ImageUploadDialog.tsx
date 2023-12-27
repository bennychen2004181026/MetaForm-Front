import React, { useRef, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import DragDropBox from '@/components/DragDropBox';

interface IImage {
    name: string;
    url: string;
}
const ImageUploadDialog = () => {
    const [image, setImage] = useState<IImage>({ name: '', url: '' });
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const selectFiles = () => fileInputRef.current && fileInputRef.current.click();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files;
        if (file !== null && file.length > 0) {
            setImage({ name: file[0].name, url: URL.createObjectURL(file[0]) });
        }
    };
    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Insert Image</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {isDragging ? (
                            <span>Drop Image here</span>
                        ) : (
                            <span>Drop & Drop Image here</span>
                        )}
                    </DialogContentText>
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={(e) => onFileSelect(e)}
                        />
                        <Button variant="outlined" onClick={selectFiles}>
                            Browse
                        </Button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ImageUploadDialog;
