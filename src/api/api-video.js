import { slugyfy } from "../helpers/stringHelpers"
import { db } from "./database"

/* ADD */
export const addVideo = async (video) => {
    try {
        video.slug = slugyfy(video.title)
        await db.addData('videos', video)
        return {
            isSuccess: true,
            message: "Video added successfully 👍🏽"
        }
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            error
        }
    }
}

/* UPDATE */
export const updateVideo = async (video) => {
    try {
        video.slug = slugyfy(video.title)
        await db.updateData('videos', video)
        return {
            isSuccess: true,
            message: "Video updated successfully 👍🏽"
        }
        
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            error
        }
    }
}

/* GET */
export const getVideo = async (_id) => {
    try {
        const video = await db.getData('videos', _id)
        return {
            isSuccess: true,
            result: video,
        }
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            error
        }
    }
}

/* GET ALL */
export const getAllVideo = async () => {
    try {
        const videos = await db.getAllData('videos')
        return {
            isSuccess: true,
            results: videos,
        }
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            error
        }
    }
}

/* DELETE */
export const deleteVideo = async (_id) => {
    try {
        await db.deleteData('videos', _id)
        return {
            isSuccess: true,
            message: "Video deleted successfully 👍🏽"
        }
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            error
        }
    }
}

/* SEARCH */
export const searchVideoBySlug = async (slug) => {
    try {
        const video = await db.search("videos", 'slug', slug);
        return {
            isSuccess: true,
            result: video[0],
        }
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            error
        }
    }
}


/* Pagination */
export const getVideoByPage = async (page=1, pageSize=10) => {
    try {
        return await db.getDataWithPagination("videos", page, pageSize);
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            error
        }
    }
}


/* Pagination */
export const findVideo = async (keyword, field='title', page=1, pageSize=10) => {
    try {
        return await db.searchByTag("videos", field, keyword, page, pageSize);
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            error
        }
    }
}