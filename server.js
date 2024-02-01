
const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 8008;

const server = http.createServer(async (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const { pathname } = parsedUrl;

    try {
        const fetchContent = async () => {
            return new Promise((resolve, reject) => {
                https.get('https://time.com', (res) => {
                    let data = '';
                    res.on('data', (chunk) => { data += chunk; });
                    res.on('end', () => { resolve(data); });
                }).on('error', (error) => { reject(error); });
            });
        };

        if (pathname === '/getTimeStories') {
            const fetchedData = await fetchContent();
            const processedData = processData(fetchedData);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(processedData));
        } else {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'Route not found' }));
        }
    } catch (error) {
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Internal server error' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

function processData(data) {
    const extractedData = [];
    const dataRegex = /<article.*?>[\s\S]*?<h3.*?>(.*?)<\/h3>[\s\S]*?<a.*?href="(.*?)".*?>/g;
    let match;
    while ((match = dataRegex.exec(data)) !== null && extractedData.length < 6) {
        const itemData = match[1].trim();
        const link = match[2];
        extractedData.push({ story: itemData, link: link });
    }
    return extractedData;
}

