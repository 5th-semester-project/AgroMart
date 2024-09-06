import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaTwitch } from "react-icons/fa";

// Test suite for Footer component
describe("Footer Component", () => {
  // Test if the component renders without crashing
  it("should render the Footer component", () => {
    render(<Footer />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  // Test if the company name AgroMart appears
  it("should display the company name", () => {
    render(<Footer />);
    const companyName = screen.getByText("AgroMart");
    expect(companyName).toBeInTheDocument();
  });

  // Test if the contact email link works
  it("should display the correct contact email", () => {
    render(<Footer />);
    const emailLink = screen.getByText("contact@agromart.com");
    expect(emailLink).toHaveAttribute("href", "mailto:contact@agromart.com");
  });

  // Test if the social media icons are rendered with correct links

    it('should render social media icons with correct links', () => {
      render(<Footer />);
  
      const githubLink = screen.getByRole('link', { name: /github/i });
      const facebookLink = screen.getByRole('link', { name: /facebook/i });
      const instagramLink = screen.getByRole('link', { name: /instagram/i });
      const twitterLink = screen.getByRole('link', { name: /twitter/i });
      const twitchLink = screen.getByRole('link', { name: /twitch/i });
  
      expect(githubLink).toHaveAttribute('href', 'https://github.com');
      expect(facebookLink).toHaveAttribute('href', 'https://facebook.com');
      expect(instagramLink).toHaveAttribute('href', 'https://instagram.com');
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
      expect(twitchLink).toHaveAttribute('href', 'https://twitch.com');
    });
 

  // Test if the logo is rendered
  it("should display the logo", () => {
    render(<Footer />);
    const logo = screen.getByAltText("AgroMart Logo");
    expect(logo).toBeInTheDocument();
  });
});
