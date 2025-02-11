import { Fragment, useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function CheckBoxList({ items, onChangeItems }) {
    const [renderedItems, setRenderedItems] = useState([]);
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        setRenderedItems(items);
    }, [items]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    //Callback for updating formData[users] in parent component
    useEffect(() => {
        onChangeItems(checked);
    }, [checked]);

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {(renderedItems) ? renderedItems.map((item) => (
                <ListItem
                    key={item.id}
                    disablePadding
                >
                    <ListItemButton role={undefined} onClick={handleToggle(item.id)} dense>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.includes(item.id)}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': `checkbox-list-label-${item.first_name} ${item.last_name}` }}
                            />
                        </ListItemIcon>
                        <ListItemText id={`checkbox-list-label-${item.first_name} ${item.last_name}`} primary={`${item.first_name} ${item.last_name}`} />
                    </ListItemButton>
                </ListItem>
            )) : <div>Loading</div>
            }
        </List>
    );
}
