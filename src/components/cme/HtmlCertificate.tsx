'use client';

import React from 'react';

interface HtmlCertificateProps {
  learnerName: string;
  completionDate: string;
}

export function HtmlCertificate({ learnerName, completionDate }: HtmlCertificateProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .certificate-container {
              width: 100vw !important;
              height: 100vh !important;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            @page {
              size: landscape;
              margin: 0.5in;
            }
            
            .no-print {
              display: none !important;
            }
            
            .certificate-content {
              transform: none !important;
              width: 100% !important;
              height: 100% !important;
              max-width: none !important;
            }
          }
          
          .certificate-container {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            position: relative;
            font-family: 'Times New Roman', serif;
            color: #333;
          }
          
          .certificate-content {
            padding: 40px;
            text-align: center;
            min-height: 700px;
            position: relative;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 3px solid #6c757d;
          }
          
          .side-logos {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0.1;
          }
          
          .side-logo-left {
            left: 20px;
          }
          
          .side-logo-right {
            right: 20px;
          }
          
          .side-logo-image {
            width: 80px;
            height: auto;
          }
          
          .top-banner {
            width: 100%;
            max-width: 600px;
            height: auto;
            margin: 0 auto 30px;
            display: block;
          }
          
          .certificate-title {
            font-size: 28px;
            font-weight: bold;
            margin: 20px 0;
            color: #2c3e50;
          }
          
          .certificate-subtitle {
            font-size: 22px;
            font-weight: bold;
            margin: 20px 0;
            color: #34495e;
          }
          
          .certificate-text {
            font-size: 16px;
            line-height: 1.6;
            margin: 20px 0;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .learner-name {
            font-size: 24px;
            font-weight: bold;
            color: #e74c3c;
            text-decoration: underline;
            margin: 10px 0;
          }
          
          .program-title {
            font-style: italic;
            font-weight: bold;
            font-size: 18px;
            margin: 20px 0;
          }
          
          .completion-date {
            font-size: 20px;
            font-weight: bold;
            color: #e74c3c;
            text-decoration: underline;
            margin: 20px 0;
          }
          
          .compliance-text {
            font-size: 13px;
            line-height: 1.4;
            margin: 30px auto;
            max-width: 700px;
            text-align: center;
          }
          
          .aapa-logo-container {
            margin: 30px 0;
          }
          
          .aapa-logo {
            width: 120px;
            height: auto;
          }
        `
      }} />
      <div className="certificate-container" id="certificate-to-print">
      
      {/* Side Logos */}
      <div className="side-logos side-logo-left">
        <img src="/images/certificate/side-logo.png" alt="Med Cheat Sheets" className="side-logo-image" />
      </div>
      <div className="side-logos side-logo-right">
        <img src="/images/certificate/side-logo.png" alt="Med Cheat Sheets" className="side-logo-image" />
      </div>
      
      <div className="certificate-content">
        {/* Top Banner */}
        <img src="/images/certificate/top-banner.png" alt="MedCheatSheets.com" className="top-banner" />
        
        {/* Main Title */}
        <h1 className="certificate-title">Hospital Medicine Cheat Sheets</h1>
        
        {/* Subtitle */}
        <h2 className="certificate-subtitle">Certificate of Attendance</h2>
        
        {/* Certification Text */}
        <p className="certificate-text">This certifies that</p>
        
        {/* Learner Name */}
        <div className="learner-name">{learnerName}</div>
        
        {/* Program Text */}
        <p className="certificate-text">attended the educational program entitled:</p>
        
        {/* Program Title */}
        <div className="program-title">Hospital Medicine Cheat Sheet's Online Course</div>
        
        {/* Completion Date */}
        <div className="completion-date">{completionDate}</div>
        
        {/* Compliance Text */}
        <p className="compliance-text">
          This activity has been reviewed by the AAPA Review Panel and is compliant with AAPA
          CME Criteria. This activity is designated for 10 AAPA Category 1 CME credits. PAs
          should only claim credit commensurate with the extent of their participation. Approval is
          valid from 5/31/2025 to 5/31/2026. AAPA reference number: CME-2013686
        </p>
        
        {/* AAPA Logo */}
        <div className="aapa-logo-container">
          <img src="/images/certificate/aapa-category-1-circle.png" alt="AAPA Category 1 CME" className="aapa-logo" />
        </div>
      </div>
    </>
  );
}