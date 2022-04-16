import HttpRequest from "./HttpRequest";

class S3BucketProvider extends HttpRequest {
    getUploadUrl (fileType) {
        return this.get(`/s3-bucket/upload-url/${fileType}`);
    }
}

export default S3BucketProvider;