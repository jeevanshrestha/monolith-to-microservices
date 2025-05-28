import express from 'express';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { verifyToken } from './middlewares/auth';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
dotenv.config();
// Proxy configuration

app.use('/api/v1/users', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: {
        '^': '/api/users'
    },
    on: {
        proxyReq: (proxyReq, req: any, res) => {
            // You can modify the request here if needed
            console.log("Proxying",req.method, req.originalUrl );
            if(req.body &&
                Object.keys(req.body).length > 0 &&
                req.headers['content-type']?.includes('application/json')
            ) { 
                const bodyData = JSON.stringify(req.body);

                // Update the headers to include Content-Length and Content-Type
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                proxyReq.setHeader('Content-Type', 'application/json');
                
                // Write the body data to the proxy request stream
                proxyReq.write(bodyData);             
            }
        }

    }  
}));  

  
app.use('/api/v1/books', verifyToken, createProxyMiddleware({
    target: 'http://localhost:4000',
    changeOrigin: true,
    pathRewrite: {
        '^': '/api/books'
    },
    on: {
        proxyReq: (proxyReq, req: any, res) => {
            // You can modify the request here if needed
            console.log("Proxying",req.method, req.originalUrl );
            if(req.body &&
                Object.keys(req.body).length > 0 &&
                req.headers['content-type']?.includes('application/json')
            ) { 
                const bodyData = JSON.stringify(req.body);

                // Update the headers to include Content-Length and Content-Type
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                proxyReq.setHeader('Content-Type', 'application/json');
                
                // Write the body data to the proxy request stream
                proxyReq.write(bodyData);             
            }
        }

    }  
}));  
   
app.use('/api/v1/orders', verifyToken, createProxyMiddleware({
    target: 'http://localhost:4000',
    changeOrigin: true,
    pathRewrite: {
        '^': '/api/orders'
    },
    on: {
        proxyReq: (proxyReq, req: any, res) => {
            // You can modify the request here if needed
            console.log("Proxying",req.method, req.originalUrl );
            if(req.body &&
                Object.keys(req.body).length > 0 &&
                req.headers['content-type']?.includes('application/json')
            ) { 
                const bodyData = JSON.stringify(req.body);

                // Update the headers to include Content-Length and Content-Type
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                proxyReq.setHeader('Content-Type', 'application/json');
                
                // Write the body data to the proxy request stream
                proxyReq.write(bodyData);             
            }
        }

    }  
}));  
   

// Route to check server health
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API Gateway is running !'
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    }   
).on('error', (err) => {
    console.error('Error starting server:', err);
});

