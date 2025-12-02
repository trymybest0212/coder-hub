const connection = require("../app/database");

class MomentService {
    async createMomentService(userId, content) {
        const statement = `INSERT INTO MOMENTS (user_id,content) VALUES(?,?)`
        try {
            const [result] = await connection.execute(statement, [userId, content]);
            return result
        } catch (error) {
            console.log(error, '动态插入失败');
        }
    }
    async getDetailById(momentId) {
        // 将动态和评论聚合返回
        //         const statement = `
        // SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime
        // ,JSON_OBJECT('id',u.id,'name',u.name) user, 
        // JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createAt,'updateTime',c.updateAt
        // ,'user',JSON_OBJECT('id',cu.id,'name',cu.name))) commentList 
        //  FROM moments m  
        //  LEFT JOIN users u ON m.user_id  = u.id
        //  LEFT JOIN comments c ON c.moment_id  = m.id 
        //  LEFT JOIN users cu ON c.user_id  = cu.id
        //  WHERE m.id = ?
        //  GROUP BY m.id, m.content, m.createAt, m.updateAt, u.id, u.name`
        // 将动态和评论单独分接口返回
        const statement = `SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) user,
        IF(COUNT(l.id), JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)) ,NULL) labels,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',files.filename))
        FROM files where m.id = files.moment_id) images
        FROM moments m  
LEFT JOIN users u ON m.user_id  = u.id
LEFT JOIN moment_labels ml ON ml.moment_id  = m.id 
LEFT JOIN labels l ON ml.label_id  = l.id 
WHERE m.id = ?
 GROUP BY m.id
`
        try {
            const [result] = await connection.execute(statement, [momentId]);
            return result[0]
        } catch (error) {
            console.log(error, '获取详情失败');
        }
    }
    async getMomentList(offset, limit) {
        const statement = `SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,JSON_OBJECT('id',u.id,'name',u.name) user,
(SELECT COUNT(*) FROM comments WHERE comments.moment_id = m.id) commentCount,
(SELECT COUNT(*) FROM moment_labels ml WHERE ml.moment_id = m.id) labelCount
 FROM moments m
 LEFT JOIN users u ON m.user_id  = u.id LIMIT ? , ?`;
        try {
            const [result] = await connection.execute(statement, [offset, limit]);
            return result
        } catch (error) {
            console.log(error, '获取列表失败');
        }
    }
    async update(content, id) {
        const statement = `UPDATE moments SET content = ? WHERE id = ?`
        try {
            const [result] = await connection.execute(statement, [content, id]);
            return result
        } catch (error) {
            console.log(error, '修改动态失败');
        }
    }
    async remove(momentId) {
        const statement = `DELETE FROM moments WHERE id = ?`
        try {
            const [result] = await connection.execute(statement, [momentId]);
            return result
        } catch (error) {
            console.log(error, '删除动态失败');
        }
    }
    async addLabel(id, labels) {
        const statement = `INSERT INTO moment_labels (moment_id,label_id) VALUES (?,?)`
        try {
            labels.forEach(async (item) => {
                await connection.execute(statement, [id, item.id]);
            })
        } catch (error) {
            console.log(error, '动态添加标签失败');
        }

    }

}

module.exports = new MomentService();