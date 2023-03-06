import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Avatar,
  ListItemAvatar,
} from "@mui/material/";

const WateringFormItem = ({
  id,
  plant,
  name,
  imageUrl,
  handleToggle,
  checked,
}) => {
  return (
    <ListItem
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={handleToggle(id)}
          checked={checked.indexOf(id) !== -1}
        />
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar
            src={imageUrl}
            alt="image"
            // onError={onMediaFallback}
          />
        </ListItemAvatar>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
};

export default WateringFormItem;
