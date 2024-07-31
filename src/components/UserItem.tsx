export default function UserItem() {
    return (
        <div className="flex items-center ml-4 mb-2">
            <div className="rounded-full h-12 w-12 overflow-hidden">
                <img
                    className="h-full w-full object-cover"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/440px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
                    alt="Profile"
                />
            </div>
            <p className="ml-4">Trung Tran</p>
        </div>
    );
}