"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { ACTION, ENTITY_TPYE } from "@prisma/client"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"
import { createAuditLog } from "@/lib/create-audit-log"

import { InputType, ReturnType } from "./types"
import { DeleteBoard } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
        return {
            error: "Unauthrozied"
        }
    }

    const { id } = data

    let board

    try {
        board = await db.board.delete({
            where: {
                id,
                orgId
            }
        })

        await createAuditLog({
            entityId: board.id,
            entityTitle: board.title,
            entityType: ENTITY_TPYE.BOARD,
            action: ACTION.DELETE
        })
        
    } catch (error) {
        return {
            error: "Failed to delete"
        }
    }

    revalidatePath(`/organization/${orgId}`)
    redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)