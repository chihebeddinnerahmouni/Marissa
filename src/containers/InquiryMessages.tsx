
const InquiryMessages = ({details}:any) => {
    return (
    <div className="content w-full px-4 mt-5 md:w-[550px] xl:w-[650px]">
      
        <div className="flex flex-col space-y-5 lg:space-y-8">
            {details.messages.map((message:any) => (
            <div key={message.id} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                <img src={message.sender === "user" ? details.userProfilePic : details.profilePic} className="w-8 h-8 rounded-full bg-gray-300 object-cover object-center" />
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">{message.sender ==="user" ? details.userName : details.captainName}</span>
                    <span className="text-xs text-gray-500">{message.date} {message.time}</span>
                </div>
                </div>
                <div className="bg-gray-100 p-2 rounded-md">
                <span>{message.message}</span>
                </div>
            </div>
            ))}
        </div>
  </div>
    )

}

export default InquiryMessages
