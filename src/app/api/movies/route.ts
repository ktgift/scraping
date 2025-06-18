// src/app/api/movies/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export async function GET() {
    try {
        // --- CHANGE 1: เปลี่ยน URL เป้าหมาย ---
        const targetUrl = 'https://pantip.com/topic/39431166';

        // const response = await axios.get(targetUrl, {
        //     headers: {
        //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        //     }
        // });

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        console.log('Navigating to page...');
        await page.goto(targetUrl, {   
            waitUntil: 'networkidle2', // รอจนกว่า network จะมี connection ไม่เกิน 2 เส้น
            timeout: 45000 // เพิ่ม timeout สำหรับการโหลดหน้าเว็บ
        });
        console.log('Page loaded. Waiting for movie items to render...');     

        // รอ element ปรากฏ
        await page.waitForSelector('.display-post-story');
        console.log('.display-post-story selector found!');

        // [Puppeteer] ดึงโค้ด HTML ของหน้าที่แสดงผลสมบูรณ์แล้วออกมา
        const html = await page.content();
        console.log('Got page content. Passing to Cheerio...');
        // console.log(html); // จะมีข้อมูลที่โหลดด้วย JS แล้ว

        // const html = response.data;
        // console.log(`Fetched HTML from ${JSON.stringify(html)}`);

        const $ = cheerio.load(html);
        
        // --- CHANGE 2: เปลี่ยน Logic การค้นหาข้อมูลทั้งหมด ---
        const movies: { title: string; director: string; imageUrl: string, description: string, link: string }[] = [];

        // console.log(`Searching for movie elements in ${$('.display-post-story').find('div')} `);

        $('.display-post-story').each((index, element) => {
            // console.log(`Processing element ${index}: ${$(element)}`); 
            const title = $(element).find('div').text().split('<br>');  
            console.log(`Title: ${title}`);


            const imageUrl = $(element).find('.img-in-post').attr('src');
            console.log(`Image URL: ${imageUrl}`);

            // const description = $(element).find('.display-post-story__content').text().trim();


        })
        

        // วนลูปหาหนังแต่ละเรื่องที่อยู่ใน .box-movies-list
        // $('.movie-card').each((index, element) => {
        //     console.log(`Processing movie element ${element}`);

        //     // ค้นหาชื่อหนังและรูปภาพภายใน element ของหนังเรื่องนั้นๆ
        //     const title = $(element).find('.name').text().trim();
        //     const date = $(element).find('.date').text().trim();
        //     const ref = $(element).find('a').attr('href') ?? '';

        //     console.log(ref);

        //     const imageElement = $(element).find('.image').attr('style');
        //     const match = imageElement && imageElement.match(/url\(["']?(.*?)["']?\)/);

        //     const imageUrl = match ? match[1] : '';


        //     // เพิ่มข้อมูลเฉพาะหนังที่มีชื่อและรูปภาพครบถ้วน
        //     // if (title && date && imageUrl) {
        //         movies.push({
        //             date: date.substring(0,10) ?? '',
        //             title: title ?? '',
        //             imageUrl: imageUrl ?? '',
        //             ref: ref.split('/')[3] ?? ''
        //         });
        //     // }
        // });

        // --- CHANGE 3: ส่งข้อมูล movies ที่ได้กลับไป ---
        return NextResponse.json(
            { data: movies },
            { status: 200 }
        );

    } catch (error) {
        console.error('Scraping Error:', error);
        return NextResponse.json(
            { message: 'Failed to scrape data from Major Cineplex.', error: (error as Error).message },
            { status: 500 }
        );
    }
}