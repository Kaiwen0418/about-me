import React from "react";
import { personalProfile, iconList } from "../../data/data";
import DottedBox from "../DottedBox";
// import MyGitHubHeatmap from './Heatmap';

const PersonalProfile = () => {
    const profile = personalProfile[1]

    if (!profile) {
        return <div>Profile not found</div>;
    }

    const details = profile.details

    const detailSection = (
        <div className="flex flex-col justify-center items-center ">
            <table className="text-sm">
                <tbody>
                    {details.map(([label, value]) => (
                        <tr key={label}>
                            <td className="text-right pr-2">{label}</td>
                            <td className="text-left text-xs">{value}</td>
                        </tr>
                    ))}
                    <tr key={'tech'} className="mt-2">
                        <td className="text-right pr-2">{'Tech-stack:'}</td>
                        <td className="text-left ">
                            <div className="grid grid-cols-4 gap-2 mt-2">
                                {iconList.map((icon, index) => (
                                    <img key={index} src={icon} alt="Icon" className="w-5 h-5 " />
                                ))}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* <MyGitHubHeatmap/> */}
        </div>
    );

    return (
        <DottedBox
            title={profile.name}
            subtitle={profile.alias}
            paddingTop="pt-14"
            titleSize="text-3xl"
        >
            <div className="mb-4 flex justify-center space-x-4">
                <div className="w-36 h-36 overflow-hidden border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <img
                        src={profile.images.avatar}
                        alt={`${profile.name} pixel`}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            {detailSection}
        </DottedBox>
    );
};

export default PersonalProfile;
