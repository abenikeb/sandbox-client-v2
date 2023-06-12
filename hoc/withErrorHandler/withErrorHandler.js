"use client"

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ToastyModal from "@components/UI/ToastyModal/ToastModal"

const withErrorHandler = (WrrapedComponent) => { 
  return (props) => {
    const [error, setError] = useState(null)
    const [viewModal, setViewModal] = useState(false);

    useEffect(() => {
        axios.interceptors.request.use((req) => {
          setError({ error: null });
          setViewModal(false);
          return req;
        });

        axios.interceptors.response.use(
          null,
          (err) => {
            console.log("EXX", err)
            const ExpectedError =
              err.response &&
              err.response.status >= 400 &&
              err.response.status < 500;
            
            if (!ExpectedError) {
              setError({ error: err.message });
              setViewModal(true);
            }

            return Promise.reject(err);
          }
        );
    }, [])

    const ForumModal = (
      <div>
        {error && <h3 className="font-bold text-white flex flex-row justify-center items-center">{error?.error} </h3> }  
      </div>
    )

    const handleModalClose = () => {
      setViewModal(false)
    }
   
    return (
        <>
          {error?.error && <ToastyModal status="fail" show={viewModal} closeModal={handleModalClose}>
                      {ForumModal}
                    </ToastyModal> }
          <WrrapedComponent {...props} />
        </>
      );
  }
};

export default withErrorHandler;
