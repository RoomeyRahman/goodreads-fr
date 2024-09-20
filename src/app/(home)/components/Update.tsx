import CardTitle from "@/components/CardTitle"
import Image from "next/image"
import SettingIcon from "/public/assets/settings_cog.svg"
import UpdateBookCard from "./UpdateBookCard"


const Update = () => {
    return (
        <>
            {/* title */}
            <div className="flex items-center justify-between">
                <CardTitle title='Updates' className={"mb-4"} />
                <button className="text-xs flex items-center gap-2">
                    <Image src={SettingIcon} alt="settings-icon" />
                    Customize
                </button>
            </div>

            {/* update card */}
            <UpdateBookCard />

        </>
    )
}

export default Update