import { render } from '@testing-library/react';
import BannerPreview from '../banerPreview';
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';

describe('BannerPreview Component', () => {
  const defaultProps = {
    disLabel: 'Sample Label',
    imagUrl: '/sample-image.jpg',
    facebook: 'https://facebook.com/sample',
    youtube: 'https://youtube.com/sample',
    instagram: 'https://instagram.com/sample',
    className: 'sample-class',
  };

  it('renders without crashing', () => {
    const { getByText } = render(<BannerPreview {...defaultProps} />);
    expect(getByText('Sample Label')).toBeInTheDocument();
  });

  it('displays the image when imagUrl is provided', () => {
    const { getByAltText } = render(<BannerPreview {...defaultProps} />);
    const image = getByAltText('Image');
    expect(image).toHaveAttribute('src', expect.stringContaining('sample-image.jpg'));
  });

  it('renders the label correctly', () => {
    const { getByText } = render(<BannerPreview {...defaultProps} />);
    expect(getByText('Sample Label')).toBeInTheDocument();
  });

  it('renders the social media icons when links are provided', () => {
    const { container } = render(<BannerPreview {...defaultProps} />);
    expect(container.querySelector('a[href="https://facebook.com/sample"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="https://youtube.com/sample"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="https://instagram.com/sample"]')).toBeInTheDocument();
  });

  it('applies the correct className', () => {
    const { container } = render(<BannerPreview {...defaultProps} />);
    expect(container.firstChild).toHaveClass('sample-class');
  });

  it('displays a black background when imagUrl is not provided', () => {
    const { container } = render(<BannerPreview {...defaultProps} imagUrl={null} />);
    expect(container.querySelector('.bg-black')).toBeInTheDocument();
  });

  it('does not render social media icons when links are not provided', () => {
    const { container } = render(
      <BannerPreview
        disLabel="Sample Label"
        imagUrl="/sample-image.jpg"
        className="sample-class"
      />
    );
    expect(container.querySelector('a[href="https://facebook.com/sample"]')).not.toBeInTheDocument();
    expect(container.querySelector('a[href="https://youtube.com/sample"]')).not.toBeInTheDocument();
    expect(container.querySelector('a[href="https://instagram.com/sample"]')).not.toBeInTheDocument();
  });
});
