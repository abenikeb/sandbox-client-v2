"use client"
import { useState } from "react";
import Modal from "@components/UI/Modal/Modal";
import ForumCard from "@components/Dashboard/Forum";
import Button from "@components/UI/Button/Button";

const forums = [
    {
        id: 1,
        title: "Forum Topic One",
        createAt: "2 mins ago",
        image: "/assets/images/forumUser.svg",
        sub_title: "Lorem ipsum dolor sit amet",
        content:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    },
    {
        id: 2,
        title: "Forum Topic Two",
        createAt: "4 mins ago",
        image: "/assets/images/forumUser.svg",
        sub_title: "Lorem ipsum dolor sit amet",
        content:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    },
    {
        id: 3,
        title: "Forum Topic Three",
        createAt: "1 day ago",
        image: "/assets/images/forumUser.svg",
        sub_title: "Lorem ipsum dolor sit amet",
        content:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    }
]
const Forum = () => {
    const [viewModal, setViewModal] = useState(false);
    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const filterFourms = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return forums.filter(
      (forum) =>
        regex.test(forum.title) ||
        regex.test(forum.sub_title) ||
        regex.test(forum.content)
        );
    };

    const handleModalClose = () => {
        setViewModal(false)
    }

    const handleModalOpen = () => {
        setViewModal(true)
        console.log("handleModalOpen")
    }

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
        setTimeout(() => {
            const searchResult = filterFourms(e.target.value);
            setSearchedResults(searchResult);
        }, 500)
        );
    };

    const ForumModal = (
        // Modal comoponent
        <div>
            <form className='w-full flex flex-col justify-center items-center gap-y-5 px-12 pt-5'>
                <input
                    type='text'
                    placeholder='Title'
                    value=""
                    onChange=""
                    required
                    className='block w-full h-20 rounded-md border border-gray-700 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm font-medium focus:border-gray-600 focus:outline-none focus:ring-2; peer'
                />

                 <input
                    type='text-area'
                    placeholder='Type Here'
                    value=""
                    onChange=""
                    required
                    className='block w-full h-48 rounded-md border border-gray-700 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm font-medium focus:border-gray-600 focus:outline-none focus:ring-2; peer'
                />

                <button onClick={handleModalOpen} className="w-1/2 h-12 rounded-lg py-2.5 text-black px-5 border-2 border-green-300 transition-all hover:bg-white text-center font-satoshi font-semibold flex items-center justify-center mt-8">
                      Post
                </button>
                

            </form>
        </div>
    )

  return (
      <section className="w-full flex flex-col justify-start items-center">
          {/* SERACH SECTION */}
          <div className="w-5/6 flex flex-row justify-start items-center h-16 mb-8">
              <div className="w-4/5 h-full">
                   <form className='w-full flex-center h-full'>
                        <input
                            type='text'
                            placeholder='Search for a topic or a forum'
                            value={searchText}
                            onChange={handleSearchChange}
                            required
                            className='block w-full h-12 rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-md font-medium focus:border-lime-500 focus:outline-none focus:ring-offset-2 focus:ring; peer'
                            />
                    </form>
              </div>
              <div className="w-1/5 pl-5">
                  <Button onBtnAction={handleModalOpen} btn_class="btn-outline" label="+ NEW TOPIC"></Button>
                  {/* <button  className="w-full h-12 rounded-lg py-2.5 text-black px-5 border-2 border-green-300 transition-all hover:bg-white text-center font-satoshi font-semibold flex items-center justify-center">
                      + NEW TOPIC
                  </button> */}
              </div>
              
          </div>
          {/* SERACH SECTION */}

           {searchText ? (
                <ForumCard
                data={searchedResults}
                />
            ) : (
                <ForumCard data={forums}/>
            )}
          
        <Modal show={viewModal} closeModal={handleModalClose}>
          {ForumModal}
        </Modal> 
          
    </section>
  )
}

export default Forum