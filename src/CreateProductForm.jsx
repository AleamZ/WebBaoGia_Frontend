import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';

// Cấu hình axios với baseURL là http://localhost:5000/api
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const { Option } = Select;

const CreateProductForm = ({ token }) => {
  const [seriesList, setSeriesList] = useState([]);  // Khởi tạo là mảng rỗng
  const [selectedSeriesName, setSelectedSeriesName] = useState('');
  const [selectedSeriesId, setSelectedSeriesId] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch series list on component mount
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        console.log('Fetching series...');
        const response = await api.get('/series', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Kiểm tra response từ API
        console.log('API /series response:', response);

        // Đảm bảo rằng response.data là một mảng trước khi setSeriesList
        if (Array.isArray(response.data)) {
          setSeriesList(response.data);
        } else {
          message.error('Invalid data format from API');
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        // In ra lỗi chi tiết nếu gặp lỗi
        message.error('Failed to load series.');
        console.error('Error in API /series:', error);
      }
    };

    fetchSeries();
  }, [token]);

  // Fetch series name when series is selected
  const handleSeriesChange = async (seriesId) => {
    setSelectedSeriesId(seriesId);
    try {
      console.log(`Fetching series name for ID: ${seriesId}`);
      const response = await api.get(`/series/${seriesId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Kiểm tra response từ API
      console.log(`API /series/${seriesId} response:`, response);

      setSelectedSeriesName(response.data.name);
    } catch (error) {
      // In ra lỗi chi tiết nếu gặp lỗi
      message.error('Failed to load series name.');
      console.error(`Error in API /series/${seriesId}:`, error);
    }
  };

  // Handle form submission
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const productData = {
        ...values,
        seriesId: selectedSeriesId, // Include the selected series ID
      };

      // Gửi yêu cầu POST để tạo sản phẩm mới
      console.log('Creating new product with data:', productData);
      const response = await api.post('/products', productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kiểm tra response từ API
      console.log('API /products response:', response);

      message.success('Product created successfully!');
    } catch (error) {
      // In ra lỗi chi tiết nếu gặp lỗi
      message.error('Failed to create product.');
      console.error('Error in API /products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
      <h2>Create a New Product</h2>
      <Form layout="vertical" onFinish={onFinish}>
        {/* Series Select */}
        <Form.Item label="Series" name="seriesId" rules={[{ required: true, message: 'Please select a series' }]}>
          <Select placeholder="Select a series" onChange={handleSeriesChange}>
            {seriesList.length > 0 ? (
              seriesList.map((series) => (
                <Option key={series._id} value={series._id}>
                  {series.name} (ID: {series._id})
                </Option>
              ))
            ) : (
              <Option disabled>Loading series...</Option>
            )}
          </Select>
        </Form.Item>

        {/* Display selected series name */}
        {selectedSeriesName && (
          <p>
            Selected Series: <strong>{selectedSeriesName}</strong>
          </p>
        )}

        {/* Product fields */}
        <Form.Item label="Product Name" name="name" rules={[{ required: true, message: 'Please enter the product name' }]}>
          <Input placeholder="Product Name" />
        </Form.Item>

        <Form.Item label="Capacity" name="capacity" rules={[{ required: true, message: 'Please enter capacity' }]}>
          <Input placeholder="Capacity" />
        </Form.Item>

        <Form.Item label="Color" name="color" rules={[{ required: true, message: 'Please enter color' }]}>
          <Input placeholder="Color" />
        </Form.Item>

        <Form.Item label="Code" name="code" rules={[{ required: true, message: 'Please enter product code' }]}>
          <Input placeholder="Product Code" />
        </Form.Item>

        <Form.Item label="Battery" name="battery" rules={[{ required: true, message: 'Please enter battery' }]}>
          <Input placeholder="Battery" />
        </Form.Item>

        <Form.Item label="Condition" name="condition" rules={[{ required: true, message: 'Please enter condition' }]}>
          <Input placeholder="Condition" />
        </Form.Item>

        <Form.Item label="Selling Price" name="sellingPrice" rules={[{ required: true, message: 'Please enter selling price' }]}>
          <Input type="number" placeholder="Selling Price" />
        </Form.Item>

        <Form.Item label="Purchase Price" name="purchasePrice" rules={[{ required: true, message: 'Please enter purchase price' }]}>
          <Input type="number" placeholder="Purchase Price" />
        </Form.Item>

        <Form.Item label="Source" name="source" rules={[{ required: true, message: 'Please enter source' }]}>
          <Input placeholder="Source" />
        </Form.Item>

        {/* Submit button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProductForm;
