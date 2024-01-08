import { createApi } from '@reduxjs/toolkit/query/react';

import { S3UploadParams } from '@/interfaces/IS3';
import S3AxiosBaseQuery from '@/utils/S3AxiosBaseQuery';

const s3Apis = createApi({
    reducerPath: 's3Apis',
    baseQuery: S3AxiosBaseQuery,
    endpoints: (builder) => ({
        uploadFileToS3: builder.mutation<void, S3UploadParams>({
            query: ({ url, file, headers }) => ({
                url,
                method: 'PUT',
                data: file,
                headers,
            }),
        }),
    }),
});

export default s3Apis;
