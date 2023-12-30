
import { FC } from "react";
import { MultiStateCheckbox } from 'primereact/multistatecheckbox';
import { DisplayMode } from "./PictureList";

type DisplayModeSwitcherProps = {
    mode: string;
    handler: (displayMode: DisplayMode) => void;
}

export const DisplayModeSwitcher: FC<DisplayModeSwitcherProps> = ({handler, mode}) => {
    const options = [
        { value: 'medium', icon: 'pi pi-lock-open' },
        { value: 'large', icon: 'pi pi-lock' }
    ];

    return (
        <>
            {/* <div className="card flex flex-column align-items-center gap-3"> */}
            {/* <span>{mode || 'small'}</span> */}
            <MultiStateCheckbox value={mode} onChange={(e) => handler(e.value || "small")} options={options} optionValue="value" />
            {/* </div> */}
        </>
    );
}
