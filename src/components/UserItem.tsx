export default function UserItem() {
    return (
        <div className="flex">
            <div className="rounded-full h-12 w-12 overflow-hidden">
                <img
                    className="h-full w-full object-cover"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/440px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
                    alt="Profile"
                />
            </div>
            <p>Trung Tran</p>
        </div>
    );
}