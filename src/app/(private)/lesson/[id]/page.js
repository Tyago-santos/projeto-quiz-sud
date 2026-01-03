
export default async function LessonIdPage ({params}){

    const {id} = await params
    return(
        <section>
            {id}
        </section>
    )
} 