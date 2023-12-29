import { SpeedDial } from 'primereact/speeddial';

export const PictureItem = ({ pic, controlItems }: any) => (<div className="flex w-1/3 flex-wrap">
    {pic.Title}
    <SpeedDial model={controlItems} direction="down" style={{}} />
    <div className="w-full p-1 md:p-2 bg-white rounded-md m-2">
        <img
            alt={pic.Title}
            className="block h-full w-full rounded-lg object-cover object-center "
            src={pic.Source} />
    </div>
</div>)