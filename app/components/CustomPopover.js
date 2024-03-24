import { Popover, Typography } from "@mui/material";

export default function CustomPopover({anchor, setAnchor, content, className = ""}) {
    const open = Boolean(anchor)

    const handleClose = () => {
        setAnchor(null)
    }
    return(
        <Popover
        style={{ pointerEvents: 'none' }}
        open={open}
        className={className}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        >
            <Typography sx={{ p: 2 }}>{content}</Typography>
        </Popover>
    )
}