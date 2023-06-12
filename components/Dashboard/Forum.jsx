import Image from "next/image";

const ForumCard = ({data}) => {
  return (
      <div className="w-5/6 bg-slate-50 flex flex-col justify-start px-8 shadow-md backdrop-blur-lg backdrop-filter rounded-lg border border-gray-200 bg-white/20 bg-clip-padding">
        <ul className="divide-y">
            {data.map((forum) => (
            <li className="flex flex-row gap-x-5 py-5">
                <div>
                <Image
                    src={forum.image}
                    width={80}
                    height={80}
                    alt='User'
                    className=''
                /> 
                </div>
                <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{forum.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{forum.createAt}</p>
                        
                <h3 className="font-bold text-base text-gray-900">{forum.sub_title}</h3>
                <p className="text-sm text-gray-700">{forum.content}</p>
                <div className="flex flex-row gap-4 items-center text-lime-500 mt-3">
                    <p className="font-bold text-lg">3 Replies</p>
                    <div className="avatar-group -space-x-6">
                        <div className="avatar">
                            <div className="w-12">
                            <img src={forum.image} />
                            </div>
                        </div>
                        <div className="avatar">
                            <div className="w-12">
                            <img src={forum.image} />
                            </div>
                        </div>
                        <div className="avatar">
                            <div className="w-12">
                            <img src={forum.image} />
                            </div>
                        </div>
                        <div className="avatar">
                            <div className="w-12">
                            <img src={forum.image} />
                            </div>
                        </div>
                    </div>
                </div>    
                </div>      
            </li>
            ))}
            
        </ul>
    </div>

  )
}

export default ForumCard