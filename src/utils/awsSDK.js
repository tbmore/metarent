import request from '@/utils/request';
import AWS from 'aws-sdk'
/**
 * 文件服务。
 *
 * @interface FileServiceWorker
 * @author Li WenKai
 */
export default class FileServiceWorker {
    constructor(engine) {
        super(engine, FileListener);
        this.accept = '';
        this.tokenTimer = 0;
    }

    getAwsToken(force) {
        return new Promise(async (resolve, reject) => {
            if (localStorage.getItem("STAR_AWS_TOKEN") && !force) {
                resolve(JSON.parse(localStorage.getItem("STAR_AWS_TOKEN")));
            } else {
                let result = await request({
                    url: Action.GetAwsToken,
                    type: 'GET'
                });
                localStorage.setItem("STAR_AWS_TOKEN", JSON.stringify(result));
                resolve(result);
            }
        });
    }


    upload(file, options, channelId) {
        return new Promise(async (resolve, reject) => {
            let AWS = require('aws-sdk');
            let albumBucketName = 'imetalk'; // localStorage.getItem('STAR_TEST_SERVER') != 'false' ? 's3wetalk' : 'prodimetalk';
            let bucketRegion = 'ap-southeast-1';
            let IdentityPoolId = 'ap-southeast-1:e4f15510-24aa-4445-acc3-5bd40e3e107c'; // 'ap-southeast-1:124654da-e1c0-4a96-8bb3-bf22b995178d';
            let auth = await this.getAwsToken();
            AWS.config.update({
                region: bucketRegion,
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: IdentityPoolId,
                    IdentityId: auth.IdentityId,
                    token: auth.token
                }),
                useAccelerateEndpoint: true
            });

            if (typeof file == 'string') file = new FormFile(file);
            let fileName = file.name;
            let fileType = fileName.substr(fileName.indexOf("."));
            let photoKey = this.getMessageS3Path(this.engine.accName, channelId) + Utils.getUUID() + fileType;

            let fs = require("fs")
            let readStream = fs.createReadStream(file.path);
            let params = {
                Bucket: albumBucketName,
                Key: photoKey,
                Body: readStream,
            }

            let S3 = new AWS.S3({ apiVersion: '2006-03-01' });

            let upload = S3.upload(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                } if (data) {
                    console.log("Upload Success", data.Location);
                }
            });

            upload.on('httpUploadProgress', (progress) => {
                if (progress.loaded == progress.total) {
                    if (typeof options.onComplete === 'function') {
                        this.options.onComplete(file.path, progress.total);
                    } else {
                        this.delegate.onComplete(options, file.path, progress.total)
                    }

                } else {
                    if (typeof options.onChange === 'function') {
                        this.options.onChange(progress.loaded, progress.total);
                    } else {
                        this.delegate.onChange(options, progress.loaded, progress.total)
                    }
                }
            });

            upload.on('httpError', (error) => {
                console.log(error)
                if (typeof options.onError === 'function') {
                    options.onError(error);
                } else {
                    this.delegate.onError(options, error);
                }
            });

            upload.on('httpDone', (evt) => {
                if (typeof options.onComplete === 'function') {
                    options.onComplete(file.path, evt.total);
                } else {
                    this.delegate.onComplete(options, file.path, evt.total);
                }
            });

            upload.on('success', (evt) => {
                if (typeof options.onComplete === 'function') {
                    options.onComplete(file.path, evt.total);
                } else {
                    this.delegate.onComplete(options, file.path, evt.total);
                }
            });

            upload.on('complete', (evt) => {
                if (typeof options.onComplete === 'function') {
                    options.onComplete(file.path, evt.total);
                } else {
                    this.delegate.onComplete(options, file.path, evt.total);
                }

            });

            upload.promise().then((res) => {
                // 替换aws 返回地址
                res.Location = 'https://file.imetalk.net/' + res.Key;
                resolve(res)
            }).catch((err) => {
                console.log(err)
                resolve(400)
            });
        });

    }

    /**
     * 聊天消息的s3文件路径
     *
     * @param userId
     * @return
     */
    getMessageS3Path(userId, channelId) {
        let s3path = 'chatFile/channels/' + channelId + '/users/' + userId;
        if (this.type == MessageType.Image) {
            s3path = s3path + '/image/';
        } else if (this.type == MessageType.Video) {
            s3path = s3path + '/video/';
        } else if (this.type == MessageType.Audio) {
            s3path = s3path + '/audio/';
        } else if (this.type == MessageType.File) {
            s3path = s3path + '/file/';
        }
        return s3path;
    }

    _buildFile() {
        // 生成表单ID
        this.domId = '_star_file_msg_' + this.uuid;

        let container = document.createElement('div');
        container.id = this.domId;
        container.style.display = 'none';
        container.innerHTML = '<input type="file" name="file" accept="' + this.accept + '"/>';
        document.body.appendChild(container);
        return container.getElementsByTagName('input')[0];
    }

    chooseAndUploadFile(options) {
        let self = this;
        return new Promise(async (resolve, reject) => {

            let el = this._buildFile();
            el.onchange = function () {
                if (el.files != null && el.files.length > 0) {
                    let file = el.files[0];
                    self.upload(file, options).then(resolve).catch(reject);
                }
            };
            el.click();
        });
    }

    // 选择文件
    chooseFile(accept) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            this.accept = accept;

            let el = this._buildFile();
            el.onchange = function () {
                if (el.files != null && el.files.length > 0) {
                    let file = el.files[0];
                    resolve(file.path)
                    // self.upload(file, options).then(resolve).catch(reject);
                }
            };
            el.click();
        });
    }

    uploadFile(file, options) {
        let self = this;
        return new Promise(async (resolve, reject) => {

            this.upload(file, options).then(resolve).catch(reject);
        });
    }

    onRegisterStateChanged(session) {
        if (this.engine.registered) {
            this.getAwsToken(true);
            this.tokenTimer = setInterval(() => {
                this.getAwsToken(true);
            }, 6000 * 10 * 60 * 12);
        } else {
            clearInterval(this.tokenTimer);
        }
    }
}
