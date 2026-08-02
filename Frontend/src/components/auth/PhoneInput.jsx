const PhoneInput = ({ phone, setPhone, sendOTP }) => {

    return (
        <div className="flex  flex-col">
            <input
                type="text"
                placeholder="Enter Mobile Number"
                value={phone}
                onChange={(e)=>{
                    const value = e.target.value.replace(/\D/g,"");
                    if(value.length<=10){
                        setPhone(value);
                    }
                }}
                className="border border-gray-500 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-bg-color"
            />
            <button type="button" className="bg-primary-bg-color px-2 py-2 rounded-lg" onClick={sendOTP}>Send OTP</button>
        </div>
    );
};

export default PhoneInput;