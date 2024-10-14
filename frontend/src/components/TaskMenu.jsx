import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropType from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TaskForm from './TaskForm';
import { useTasks } from '../hook/useTasks';

export default function TaskMenu({ task }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // Logica del contexto para borrar
    const { deleteTasks } = useTasks()

    // Logica para el Dialog
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClickOpenDialog}>Editar</MenuItem>
                <MenuItem onClick={() => deleteTasks(task.id)}>Borrar</MenuItem>
            </Menu>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <TaskForm task={task} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

TaskMenu.propTypes = {
    task: PropType.shape({
        id: PropType.number.isRequired,
        title: PropType.string.isRequired,
        description: PropType.string.isRequired,
    }),
};