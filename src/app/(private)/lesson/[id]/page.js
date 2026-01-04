import styles from '@/styles/Lesson.module.css';

import Header from '@/components/Header';

 const calcResponse = (20/10)*100

export default async function LessonIdPage ({params}){

    const {id} = await params
    return(
        <>
        <Header/>
        <section className={styles.page} >
            <div className={styles.container}>
                <div className={styles.container_header}>
                    <div className={styles.question_header}>
                        <div  className={styles.progress}>
                            <progress value="10" max="100" className={styles.progress_bar}/>
                            <span></span>
                        </div>
                        <span className={styles.category}>Livro de Mormon</span>
                    </div>
                    <p className={styles.text_question}>Qual foi o primeiro profeta do livro de mormon Qual foi o primeiro profeta do livro de mormon Qual foi o primeiro profeta do livro de mormon</p>
                </div>
                    <div className={styles.quiz}>
                        <ul>
                            <li >
                                <span className={styles.letter}>A</span>
                                <span className={styles.options}>Lei</span>
                            </li>
                            <li>
                                <span className={styles.letter}>B</span>
                                <span className={styles.options}>Jaco</span>
                            </li>
                            <li>
                                <span className={styles.letter}>C</span>
                                <span className={styles.options}>Joseph</span>
                            </li>
                            <li>
                                <span className={styles.letter}>D</span>
                                <span className={styles.options}>Adão</span>
                            </li>
                        </ul>
                </div>
                <div className={styles.quiz_response}>
                        <ul>
                            <li >
                                <span className={styles.letter_response}>A</span>
                            </li>
                            <li>
                                <span className={styles.letter_response}>B</span>
                            </li>
                            <li>
                                <span className={styles.letter_response}>C</span>
                            </li>
                            <li>
                                <span className={styles.letter_response}>D</span>
                            </li>
                        </ul>
                </div>
                <div className={styles.container_button}>
                    <button className={styles.button_quit}>Desistir</button>                
                    <button className={styles.button_next}>Próximo</button>                
                </div>
            </div>
        </section>
        </>
        
    )
} 