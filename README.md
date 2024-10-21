## AgroMart 

## Agriculture Marketplace System Project Overview
AgroMart is an agriculture marketplace system designed to connect farmers (sellers) and buyers, facilitating seamless transactions for agricultural products. The platform allows sellers to list their products, buyers to place orders, and both parties to communicate via in-app chat. The application leverages Next.js and React for the frontend, with MongoDB serving as the database.

## Features

- **User Authentication**: Sellers and buyers can register, log in, and manage their profiles.
- **Product Listings**: Sellers can add, update, and manage their agricultural products, including setting prices and quantities.
- **Order Management**: Buyers can place orders for products, view order details, and cancel orders if needed.
- **Notifications**: Receive real-time notifications for order updates and chat messages.
- **Chat Integration**: In-app chat allows direct communication between buyers and sellers for negotiation or order clarification.
- **Dashboard Analytics**: Sellers can view insights and metrics to monitor sales and order trends.
- **Review and Rating**: Buyers can review products and rate sellers to help other users make informed purchasing decisions.


## Technologies Used

- **Frontend**: 
  - Next.js
  - React
  - Tailwind CSS
  
- **Database**: 
  - MongoDB

- **Authentication**: 
  - Clerk for secure user authentication and management

- **Deployment**: 
  - AWS, managed through Terraform for Infrastructure as Code (IaC)

- **Containerization**: 
  - Docker & Docker Hub for managing application images and containerized deployments

- **CI/CD Pipeline**: 
  - **GitHub Actions**: Automated workflows for testing, deployment, and monitoring
  - **Infrastructure Management**: 
    - Terraform for creating and managing AWS resources
  - **Static Analysis**: 
    - Trivy for container vulnerability scanning
    - SonarQube for code quality analysis
  - **Testing**: 
    - Jest for unit testing
    - SuperTest and Postman for API testing
    - React Testing Library for React component testing
    - Selenium IDE for end-to-end testing

- **Monitoring**: 
  - **Grafana**: Visualization of metrics and dashboards
  - **Prometheus**: Time-series data collection
  - **Blackbox Exporter**: Monitoring external endpoints' availability and performance
  - **Node Exporter**: Collecting system metrics like CPU, memory, and disk usage


## Getting Started
To clone the project and set up the development environment, follow these steps:

## Prerequisites
Ensure you have the following installed:

- Node.js (v14 or higher) for development
- MongoDB (v4 or higher) for the database

1.  **Clone the repository**:

```bash
git clone https://github.com/5th-semester-project/AgroMart/tree/main
cd AgroMart
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:
Create a .env file in the root folder with the necessary configurations 

4. **Start the development server**:

```bash
npm run dev
```

4. **Run Tests**:

```bash
npm test
```

## Live Demo
[AgroMart] (https://youtu.be/zHPNeduzoPI?si=cdi9X8xI55mYs2Sq) 


## GitHub Repository
[AgroMart] (https://github.com/5th-semester-project/AgroMart/tree/main)

## Contributors
- Nipun Viraj
- Neranjan Puspakumara
- Rafshan Rakeeb

## Getting Started
To clone the project and set up the development environment, follow these steps:

## Prerequisites
Ensure you have the following installed:

- Node.js (v14 or higher) for development
- MongoDB (v4 or higher) for the database

1.  **Clone the repository**:

```bash
git clone https://github.com/5th-semester-project/AgroMart/tree/main
cd AgroMart
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:
Create a .env file in the root folder with the necessary configurations 

4. **Start the development server**:

```bash
npm run dev
```

4. **Run Tests**:

```bash
npm test
```

## Live Demo
[AgroMart] (https://youtu.be/zHPNeduzoPI?si=cdi9X8xI55mYs2Sq) 


## GitHub Repository
[AgroMart] (https://github.com/5th-semester-project/AgroMart/tree/main)

## Contributors
- Nipun Viraj
- Neranjan Puspakumara
- Rafshan Rakeeb
