/*
 * Buildersbase API
 * version 2.0.0
 * http://api.buildersbase.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@Buildersbase.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import * as path from 'path';
import * as fs from 'fs';

@Service()
export class ImageService {
    // Bucket list
    public async listFolders(limit: number = 0, folderName: string = ''): Promise<any> {
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + folderName);
        console.log(directoryPath);
        console.log(__dirname);
        console.log(process.cwd());
        const files = await this.readDir(directoryPath);
        const contents = [];
        const commonPrefix = [];
        for (const file of files) {
            const pathfile = path.resolve(directoryPath, file);
            const isDir = await this.isDirCheck(pathfile);
            if (isDir) {
                commonPrefix.push({
                    Prefix: folderName ? folderName + file + '/' : file + '/',
                });
            } else {
                contents.push({
                    Key: folderName ? folderName + file : file,
                });
            }
        }
        return new Promise((resolve, reject) => {
            // passsing directoryPath and callback function
            const outputResponse: any = {};
            outputResponse.Name = 'uploads';
            outputResponse.Prefix = folderName;
            outputResponse.Delimiter = 100;
            outputResponse.IsTruncated = 'uploads';
            outputResponse.Marker = '';
            outputResponse.Contents = contents;
            outputResponse.CommonPrefixes = commonPrefix;
            resolve(outputResponse);
        });
    }

    // create folder
    public createFolder(folderName: string = ''): Promise<any> {
        // Create the parameters for calling createBucket
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + folderName);
        return new Promise((resolve, reject) => {
            if (fs.existsSync(directoryPath)) {
                resolve({ETAG: new Date()});
            }
            fs.mkdir(directoryPath, { recursive: true }, (err) => {
                if (err) {
                    reject(err);
                }
                resolve({ETAG: new Date()});
            });
        });
    }

    // upload image
    public imageUpload(folderName: string = '' , base64Image: any): Promise<any> {
        // Create the parameters for calling createBucket
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + folderName);
        return new Promise((resolve, reject) => {
            fs.writeFile(directoryPath, base64Image, 'base64', (err) => {
                if (err) {
                    reject(err);
                }
                const locationArray = directoryPath.split('/');
                locationArray.pop();
                const locationPath = locationArray.join('/');
                resolve({success: true, path: locationPath});
            });
        });
    }

    // Image resize
    public resizeImage(imgName: string = '', imgPath: string = '', widthString: string = '', heightString: string = ''): Promise<any> {
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + imgPath + imgName);
        console.log(directoryPath);
        return new Promise((resolve, reject) => {
            const gm = require('gm').subClass({ imageMagick: true });
            return  gm(directoryPath)
            .resize(widthString, heightString )
            .toBuffer((error: any, buffer: any) => {
                if (error) {
                    reject(error);
                } else {
                    console.log('Buffer' + Buffer.isBuffer(buffer));
                    resolve(buffer);
                }
            });
        });
    }

    public async isDirCheck(pathfile: string): Promise<boolean> {
        return new Promise<boolean>((subresolve, subreject) => {
            fs.stat(pathfile, (error, stat) => {
                console.log(stat);
                console.log(stat.isDirectory());
                if (stat && stat.isDirectory()) {
                    subresolve(true);
                } else {
                    subresolve(false);
                }
            });
        });
    }

    public async readDir(pathfile: string): Promise<any> {
        return new Promise<any>((subresolve, subreject) => {
            fs.readdir(pathfile, (error, files) => {
                if (error) {
                    subreject(error);
                }
                subresolve(files);
            });
        });
    }

}
