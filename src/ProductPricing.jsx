import React, { useEffect, useState, useRef } from 'react';
import './ProductPricing.css';
import PhoneTable from './PhoneTable';
import { Button, Switch } from 'antd';
import { fetchSeries, fetchProductsBySeries } from './api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProductPricing = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [productsBySeries, setProductsBySeries] = useState({});
  const [showFullColumns, setShowFullColumns] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const tableRefs = useRef({}); // To store references for scrolling
  const navigate = useNavigate(); // Initialize navigate

  const limitedColumns = ['name', 'capacity', 'color', 'code', 'battery', 'condition', 'sellingPrice'];
  const fullColumns = [...limitedColumns, 'purchasePrice', 'source'];

  // Fetch series and their products
  const fetchData = async () => {
    try {
      // Fetch all series
      const seriesData = await fetchSeries();
      setSeriesList(seriesData);

      // Fetch products for each series and store in an object
      const productsBySeriesTemp = {};
      for (let series of seriesData) {
        const products = await fetchProductsBySeries(series._id, token);
        productsBySeriesTemp[series.name] = products;
        tableRefs.current[series.name] = React.createRef(); // Create ref for each series
      }
      setProductsBySeries(productsBySeriesTemp);
    } catch (error) {
      console.error('Failed to fetch series or products:', error);
    }
  };

  // Scroll to the specific table based on the series name
  const scrollToTable = (seriesName) => {
    const ref = tableRefs.current[seriesName];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    setIsLoggedIn(false); // Update login state
    setToken(null); // Clear the token
    // Optionally, you can redirect the user to a login page
    // navigate('/login'); if you are using react-router
  };

  // Check if there's a token in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
    fetchData();
  }, [showFullColumns]);

  return (
    <div className="product-pricing-container">
      {/* Sticky header with buttons */}
      <div className="sticky-header">
        {seriesList.map((series) => (
          <Button key={series._id} onClick={() => scrollToTable(series.name)}>
            {series.name}
          </Button>
        ))}

        {/* Show the Switch and Add Product button only if the user is logged in */}
        {isLoggedIn && (
          <>
            <Switch
              checked={showFullColumns}
              onChange={() => setShowFullColumns(!showFullColumns)}
              checkedChildren="Full"
              unCheckedChildren="Limited"
            />
            {/* Add Product Button */}
            <Button
              type="primary"
              onClick={() => navigate('/addproduct')} // Navigate to the CreateProductForm page
              style={{ marginLeft: '10px' }}
            >
              Thêm sản phẩm
            </Button>
            {/* Logout Button */}
            <Button type="primary" onClick={handleLogout} style={{ marginLeft: '10px' }}>
              Đăng xuất
            </Button>
          </>
        )}
      </div>

      {/* Tables for each series */}
      {seriesList.map((series) => (
        <div key={series._id} ref={tableRefs.current[series.name]} className="table-container">
          <h2>{series.name}</h2>
          <PhoneTable
            data={productsBySeries[series.name] || []}
            columns={showFullColumns ? fullColumns : limitedColumns}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductPricing;
