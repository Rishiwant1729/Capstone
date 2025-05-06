import React from 'react'
import Layout from '../../layout'
import './home.css'
import '../../index.css'

function Index() {
  return (
    <Layout>
      <div className="home-page-cards">
        <div className="home-page-col-one">
          <div className="col-card-one-home">
            <div className="col-card-one-img1">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPnj-LFhg5wPoUiWp9Gzc5e-kDgBRsvTR2_w&s" alt="backCover" />
            </div>
            <div className="col-card-one-img2">
              <img src="https://www.corporatephotographerslondon.com/wp-content/uploads/2022/02/FRA-1699dark-sq.jpg" alt="userImage" />
            </div>
            <div className="user-home-page-name">
              <h1>Anthony Gamosa</h1>
            </div>
            <div className="user-home-page-about">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit illo, ut consequatur dolores error cum,</p>
            </div>
            <div style={{marginTop:"15px", marginBottom:'10px',padding:'5px'}} className="app-hr-line">
            </div>
            <div className="whoViewProfileSec">
              <div className="whoViewCol-one">
              <span>Connections</span>
              <span>444</span>
              </div>
              <div className="whoViewCol-two">
              <span>Who viewed your profile</span>
              <span>25+</span>
              </div>
              
            </div>
            <div style={{marginTop:"15px", marginBottom:'10px',padding:'5px'}} className="app-hr-line">
            </div>
            
            <div className="getPremium">
              <p>Access exclusive tools & insights.</p>
              <p>
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="premium-chip-medium" aria-hidden="true" role="none" data-supported-dps="24x24" width="24" height="24">
                  <path d="M20 20a3.36 3.36 0 001-2.39V6.38A3.38 3.38 0 0017.62 3H6.38A3.36 3.36 0 004 4z" fill="#F8C77E"></path>
                  <path d="M4 4a3.36 3.36 0 00-1 2.38v11.24A3.38 3.38 0 006.38 21h11.24A3.36 3.36 0 0020 20z" fill="#E7A33E"></path>
                </svg>
                Try premium free for 1 month
              </p>
            </div>

            <div style={{marginTop:"15px", marginBottom:'10px',padding:'5px'}} className="app-hr-line">
            </div>

            <div className="getnews">
              <ul>
                <li>
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="bookmark-fill-small" aria-hidden="true" role="none" data-supported-dps="16x16" fill="#000000" fill-opacity="0.9" width="16" height="16">
                  <path d="M13 4a3 3 0 00-3-3H3v14l5-4.5 5 4.5z" fill-opacity="0.9"></path>
                </svg>
                <span>Saved Items</span>
                
                </li>

                <li>
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="group-small" aria-hidden="true" role="none" data-supported-dps="16x16" fill="#000000" fill-opacity="0.9" width="16" height="16">
                  <path d="M8.5 7h-1A1.5 1.5 0 006 8.5V14h4V8.5A1.5 1.5 0 008.5 7zM12.75 8h-.5A1.25 1.25 0 0011 9.25V14h3V9.25A1.25 1.25 0 0012.75 8z" fill-opacity="0.9"></path>
                  <circle cx="8" cy="4" r="2" fill-opacity="0.9"></circle>
                  <circle cx="12.5" cy="5.5" r="1.5" fill-opacity="0.9"></circle>
                  <path d="M3.75 8h-.5A1.25 1.25 0 002 9.25V14h3V9.25A1.25 1.25 0 003.75 8z" fill-opacity="0.9"></path>
                  <circle cx="3.5" cy="5.5" r="1.5" fill-opacity="0.9"></circle>
                </svg>
                <span>Groups</span>
               
                </li>

                <li>
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="newspaper-small" aria-hidden="true" role="none" data-supported-dps="16x16" fill="#000000" fill-opacity="0.9" width="16" height="16">
                  <path d="M13 4v8H3V4h10m2-2H1v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V2zm-3 3H4v2h8V5zM7 8H4v3h3V8zm5 0H8v1h4V8zm0 2H8v1h4v-1z" fill-opacity="0.9"></path>
                </svg>
                <span>Newsletters</span>
               
                </li>


                <li>
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="calendar-small" aria-hidden="true" role="none" data-supported-dps="16x16" fill="#000000" fill-opacity="0.9" width="16" height="16">
                    <path d="M2 2v9a3 3 0 003 3h6a3 3 0 003-3V2zm8.5 1.5a1 1 0 11-1 1 1 1 0 011-1zm-5 0a1 1 0 11-1 1 1 1 0 011-1zM12 11a1 1 0 01-1 1H5a1 1 0 01-1-1V7h8z" fill-opacity="0.9"></path>
                </svg>
                <span>Events</span>
                
                </li>

                
              </ul>
            </div>





          </div>
        </div>
        <div className="home-page-col-two"></div>
        <div className="home-page-col-three"></div>
      </div>
    </Layout>
  )
}

export default Index;