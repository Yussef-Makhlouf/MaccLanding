"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetApplicationState } from "@/store/slices/careersSlice";
import CareerHero from "@/components/career/CareerHero";
import JobListings from "@/components/career/JobListings";
import CareerCTA from "@/components/career/CareerCTA";
import FAQAccordion from "@/components/career/FAQAccordion";
import PrivacyModal from "@/components/career/PrivacyModal";
import ApplicationForm from "@/components/career/ApplicationForm";
import SuccessModal from "@/components/career/SuccessModal";
import type { Career } from "@/lib/careers/types";
import JobDetailsModal from "@/components/career/JobDetailsModal";

const CareerPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { applicationSuccess } = useAppSelector((state) => state.careers);

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [showJobDetailsModal, setShowJobDetailsModal] = useState(false);

  const handleApplyClick = (career?: Career) => {
    if (career) {
      setSelectedCareer(career);
    } else {
      // For general "Apply Now" CTA without specific job
      setSelectedCareer(null);
    }
    setShowPrivacyModal(true);
  };

  const handlePrivacyAccept = () => {
    setShowPrivacyModal(false);
    setShowApplicationForm(true);
  };

  const handleViewDetails = (career: Career) => {
    setSelectedCareer(career);
    setShowJobDetailsModal(true);
  };
  const handleCloseJobDetails = () => {
    setShowJobDetailsModal(false);
    setSelectedCareer(null);
  };

  const handleApplyFromDetails = () => {
    setShowJobDetailsModal(false);
    setShowPrivacyModal(true);
    // selectedCareer already set
  };

  const handleCloseApplication = () => {
    setShowApplicationForm(false);
    setShowApplicationForm(false);
    setSelectedCareer(null);
    dispatch(resetApplicationState());
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setSelectedCareer(null);
    dispatch(resetApplicationState());
  };

  // Watch for applicationSuccess from Redux and show success modal
  React.useEffect(() => {
    const handleApplicationSubmit = () => {
      // This will be called after successful submission from ApplicationForm
      setShowApplicationForm(false);
      setShowSuccessModal(true);

      // Reset application state after 2 seconds
      setTimeout(() => {
        dispatch(resetApplicationState());
        setSelectedCareer(null);
      }, 2000);
    };
    if (applicationSuccess && showApplicationForm) {
      handleApplicationSubmit();
    }
  }, [applicationSuccess, showApplicationForm, dispatch]);

  // Calculate if any modal is open
  const isAnyModalOpen =
    showPrivacyModal ||
    showApplicationForm ||
    showSuccessModal ||
    showJobDetailsModal;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <CareerHero isModalOpen={isAnyModalOpen} />

      {/* Job Listings */}
      <JobListings
        onApply={handleApplyClick}
        onViewDetails={handleViewDetails}
      />

      {/* CTA Section */}
      <CareerCTA onApply={() => handleApplyClick()} />

      {/* FAQ Section */}
      <FAQAccordion />

      {/* Modals */}
      <JobDetailsModal
        isOpen={showJobDetailsModal}
        onClose={handleCloseJobDetails}
        career={selectedCareer}
        onApply={handleApplyFromDetails}
      />
      <PrivacyModal
        isOpen={showPrivacyModal}
        onClose={() => {
          setShowPrivacyModal(false);
        }}
        onAccept={handlePrivacyAccept}
      />

      {/* Show ApplicationForm regardless of selectedCareer */}
      <ApplicationForm
        isOpen={showApplicationForm}
        onClose={handleCloseApplication}
        careerId={selectedCareer?.id}
        jobTitle={selectedCareer?.title}
        isGeneralApplication={!selectedCareer}
      />

      <SuccessModal isOpen={showSuccessModal} onClose={handleCloseSuccess} />
    </div>
  );
};

export default CareerPage;
