import styles from '@/styles/Lesson.module.css';




export default async function LessonIdPage ({params}){

    const {id} = await params
    return(
        <section className={styles.page} >
            <div className={styles.container}>
                <div className={styles.container_header}>
                    <div className={styles.question_header}>
                        <span className={styles.progress}> Questões 1 / 20</span>
                        <span className={styles.category}>livro de mormon</span>
                    </div>
                    <p className={styles.text_question}>Qual foi o primeiro profeta do livro de mormon Qual foi o primeiro profeta do livro de mormon Qual foi o primeiro profeta do livro de mormon</p>
                </div>


                       <div className={styles.quiz}>
                    <ul>
                        <li>
                            <span>A</span>
                            <span>Lei</span>
                        </li>
                        <li>
                            <span>B</span>
                            <span>Jaco</span>
                        </li>
                        <li>
                            <span>C</span>
                            <span>Joseph</span>
                        </li>
                        <li>
                            <span>D</span>
                            <span>Adão</span>
                        </li>
                    </ul>
                </div>
            </div>

         


        </section>
    )
} 