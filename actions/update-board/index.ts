"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { ACTION, ENTITY_TPYE } from "@prisma/client"

import { db } from "@/lib/db"
import { createAuditLog } from "@/lib/create-audit-log"
import { createSafeAction } from "@/lib/create-safe-action"

import { InputType, ReturnType } from "./types"
import { UpdateBoard } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
        return {
            error: "Unauthrozied"
        }
    }

    const { title, id } = data

    let board

    try {
        board = await db.board.update({
            where: {
                id,
                orgId
            },
            data: {
                title
            }
        })

        await createAuditLog({
            entityId: board.id,
            entityTitle: board.title,
            entityType: ENTITY_TPYE.BOARD,
            action: ACTION.UPDATE
        })
        
    } catch (error) {
        return {
            error: "Failed to update"
        }
    }

    revalidatePath(`/board/${id}`)
    return { data: board }
}

export const updateBoard = createSafeAction(UpdateBoard, handler)