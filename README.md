Setup Private Click Measurement (PCM) Events Locally

This document describes how to setup latest PCM: https://webkit.org/.../introducing-private-click.../ locally so that you can test your changes.

BROWSER SET UP

1. Download Safari Technology Preview latest version from https://developer.apple.com/safari/technology-preview/
2. Develop Menu - To see develop menu for Safari Technology Preview -Open Safari Technology Preview, click on “Safari Technology Preview” menu on the top left corner and choose “Developer”. Click on “Experimental Features” tab. Click “Private Click Measurement Debug Mode”.
Your Safari Technology preview browser is ready for testing.

HOSTING WEBSITES ON YOUR LOCAL SERVER

For Step 2 redirects, you will need to set up a webpage similar to that of an advertiser’s website where the conversion will happen. In this section, we will go step by step to set that up. Here we will host search.example and shop.example. And redirects will happen between them

0. Install nodejs from https://nodejs.org/en/download/
1. Create a simple server.js file (Already included in the github link)
2. Create a simple web page - test.html (Already included in the github link)
3. Generate certificates for your server
openssl req -x509 -nodes -days 30 -newkey rsa:2048 -keyout key.pem -out certificate.pem -config req.conf -extensions 'v3_req'
4. You need to trust this certificate, example: https://tosbourn.com/getting-os-x-to-trust-self-signed.../
5. Add the following lines to the beginning of your /etc/hosts file
127.0.0.1 search.example
127.0.0.1 shop.example
6. Start the node server - node server.js
7. Restart safari and visit https://search.example, click an ad on it, will direct users to shop.example and you can make a conversion there

TEST STEP 1 2 3

1. Restart safari and visit https://search.example
2. Click on the ad link and then click on the purchase button you should see attachments
3. You should also see post request in your server.js end point
