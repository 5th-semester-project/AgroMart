import { POST } from '@/app/api/buyer/createAccount/route';
import { auth } from '@clerk/nextjs/server';

// Mock Clerk's auth module
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
}));

// Mock Prisma Client
jest.mock('@/lib/prismadb', () => ({
  buyer: {
    create: jest.fn(),
  },
}));

describe('createAccount API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper function to mock the request object
  const mockRequest = (body) => ({
    json: jest.fn().mockResolvedValue(body),  // Simulates the json() method of the Request object
  });

  test('should return forbidden if user is not authenticated', async () => {
    // Mock auth to return null userId
    auth.mockReturnValueOnce({ userId: null });

    const req = mockRequest({
      UserFullName: 'John Doe',
      UserPhoneNum: '1234567890',
      UserEmail: 'john.doe@example.com',
      province: 'Example Province',
      district: 'Example District',
      area: 'Example Area',
      address: 'Example Address',
    });

    // Execute the POST function
    const response = await POST(req);

    expect(auth).toHaveBeenCalled();
    expect(req.json).toHaveBeenCalled();
    expect(response.status).toBe(403);
    expect(await response.text()).toEqual('Unauthorized');
  });

  test('should create a buyer account and return the created buyer', async () => {
    const mockUserId = '1234567890';
    const mockRequestBody = {
      UserFullName: 'John Doe',
      UserPhoneNum: '1234567890',
      UserEmail: 'john.doe@example.com',
      province: 'Example Province',
      district: 'Example District',
      area: 'Example Area',
      address: 'Example Address',
    };

    // Mock auth to return a userId
    auth.mockReturnValueOnce({ userId: mockUserId });

    const req = mockRequest(mockRequestBody);

    const mockCreatedBuyer = {
      id: 'buyer123',
      name: 'John Doe',
      phoneNum: '1234567890',
      email: 'john.doe@example.com',
      province: 'Example Province',
      district: 'Example District',
      area: 'Example Area',
      address: 'Example Address',
    };

    const prismadbMock = require('@/lib/prismadb');
    prismadbMock.buyer.create.mockResolvedValueOnce(mockCreatedBuyer);

    const response = await POST(req);

    expect(auth).toHaveBeenCalled();
    expect(req.json).toHaveBeenCalled();
    expect(prismadbMock.buyer.create).toHaveBeenCalledWith({
      data: {
        userId: mockUserId,
        name: 'John Doe',
        phoneNum: '1234567890',
        email: 'john.doe@example.com',
        province: 'Example Province',
        district: 'Example District',
        area: 'Example Area',
        address: 'Example Address',
      },
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockCreatedBuyer);
  });

  test('should return an error response if an error occurs', async () => {
    auth.mockReturnValueOnce({ userId: '1234567890' });

    const req = mockRequest({
      UserFullName: 'John Doe',
      UserPhoneNum: '1234567890',
      UserEmail: 'john.doe@example.com',
      province: 'Example Province',
      district: 'Example District',
      area: 'Example Area',
      address: 'Example Address',
    });

    req.json.mockRejectedValueOnce(new Error('Some error'));

    const response = await POST(req);

    expect(auth).toHaveBeenCalled();
    expect(req.json).toHaveBeenCalled();
    expect(response.status).toBe(500);
    expect(await response.text()).toEqual('Failed to create an account. Please try again.');
  });
});
