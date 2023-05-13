import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "posts") //current working directory - webdev\njsblog

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(file => {
        const id = file.replace(/\.md$/, '') // filename without md

        const fullPath = path.join(postsDirectory, file) // get path to file

        const fileContent = fs.readFileSync(fullPath, 'utf8') // reads md file

        const matterResult = matter(fileContent); //pulls metadata from md files

        return {
            id,
            ...matterResult.data
        }
    })

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(file => {
        const id = file.replace(/\.md$/, '')
        return {
            params: {
                id
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContent); //pulls metadata from md files
    // content: content of md file
    // data: title/date
    // isEmpty: false

    remark
    const formattedContent = await remark()
        .use(html)
        .process(matterResult.content) //formats content of md file
    const formattedContentHTML = formattedContent.toString()

    return {
        id,
        ...matterResult.data,
        formattedContentHTML
    }
}