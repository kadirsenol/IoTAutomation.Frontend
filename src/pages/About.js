
import React from "react";
import { Button } from "@mui/material";
import { AutoFixHigh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const About = () => {

  const navigate = useNavigate();

 

  return (
    <>
      <div
        className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light bg-cover bg-center bg-no-repeat min-h-screen rounded-md"
        style={{
          backgroundImage:`url(./whatisIoT.png)`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="col-md-5 p-lg-5 mx-auto my-5 w-1/4 bg-white bg-opacity-50 rounded-xl">
          <h1 className="display-4 fw-normal">
            What is IoT ?
          </h1>          
        </div>
        <div className="product-device shadow-sm d-none d-md-block" />
        <div className="product-device product-device-2 shadow-sm d-none d-md-block" />
      </div>

      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Internet of Things
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              
                <>
                  <section>
                    <h2>Basic Principles of IoT:</h2>
                    <ol>
                      <li>
                        <strong>Connectivity:</strong> IoT devices have the
                        ability to connect to the internet or a network. This
                        connection can be provided through wireless
                        communication protocols.
                      </li>
                      <li>
                        <strong>Data Collection:</strong> IoT devices collect
                        data from their surroundings through integrated sensors.
                        This data can include various measurements such as
                        temperature, humidity, motion, location, etc.
                      </li>
                      <li>
                        <strong>Data Processing and Analysis:</strong> The
                        collected data is processed and analyzed in the cloud or
                        local servers. This allows the data to gain meaning and
                        be made available for various applications.
                      </li>
                    </ol>
                  </section>
                  <section>
                    <h2>Applications of IoT:</h2>
                    <ul>
                      <li>
                        <strong>Home Automation:</strong> IoT technology enables
                        smart home devices such as thermostats, lighting
                        systems, security cameras, etc., to communicate with
                        each other and provide users with a more comfortable
                        living experience.
                      </li>
                      <li>
                        <strong>Industrial Automation:</strong> IoT devices are
                        used in factories to monitor production processes,
                        increase efficiency, and optimize maintenance.
                      </li>
                      <li>
                        <strong>Healthcare Services:</strong> IoT solutions such
                        as smart medical devices, patient monitoring systems,
                        health tracking sensors, etc., play a significant role
                        in improving healthcare and patient care.
                      </li>
                      <li>
                        <strong>Smart Cities:</strong> IoT solutions are used in
                        various areas such as traffic management, energy
                        efficiency, environmental monitoring, etc., to make
                        cities more sustainable and livable.
                      </li>
                    </ul>
                  </section>
                </>
              
            </p>
            <div className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-gray-900 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 cursor-default">
              Choose a solution and study it
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <Button
              variant="contained"
              color="inherit"
              size="large"
              onClick={() =>navigate("/")}
              endIcon={ <AutoFixHigh/>}
            >
              Start exploring
            </Button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-center">
            <img
              src={`./getstart.webp`}
              alt="mockup"
              className="rounded-md"
              style={{ alignSelf: "center" }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
