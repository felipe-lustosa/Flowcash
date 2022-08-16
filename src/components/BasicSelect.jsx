import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function BasicSelect(props) {

    const handleChange = (SelectChangeEvent) => {
        props.setSelected(SelectChangeEvent.target.value);
    };

    return (
        <>
            <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">
                    {props.label}
                </InputLabel>
                <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" required={true} value={props.selected} label={props.label} onChange={handleChange} >
                    {props.options.map((option) => (
                        < MenuItem key={option.id} value={option.id}> {option.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}
