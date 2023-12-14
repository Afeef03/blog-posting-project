import React from 'react'
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CommentIcon from '@mui/icons-material/Comment';


const Test = () => {
    return (
        <>
            <Container maxWidth='l'>
                <section className="single-blog mt-5 ms-md-5">
                    <div className="single-post-heading">
                        <h4 className="text-muted">
                            <Link to={'/'} className='text-muted'>Back</Link>
                        </h4>
                        <h3>Views : 200</h3>
                        <h1 className='display-3 fw-bold' style={{color:'#0b153a;'}}>Launching your online community in 10 minutes</h1>
                        <div className="author">
                            <h5 className="mt-5">Auhtor : Mohd Afeef</h5>
                            <p className="text-muted">CreateAt : 1-Jan-2022</p>
                        </div>
                    </div>

                    <div className="content mt-3">
                        <div className="single-post-image mt-3">
                            <img src="https://www.searchenginejournal.com/wp-content/uploads/2020/08/7-ways-a-blog-can-help-your-business-right-now-5f3c06b9eb24e-760x400.webp" alt="" />
                        </div>

                        <div className="blog-p-text mt-5">
                            <p className='text-muted'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quisquam at culpa in architecto voluptate magnam tempora deserunt, eius quae ex rem voluptas ad perferendis. Voluptates accusamus ex asperiores veniam rerum porro saepe possimus repellat sequi corporis nihil temporibus molestias veritatis repellendus labore, quasi voluptatum vel. Iure dolorem adipisci quasi voluptates aperiam odit exercitationem repellendus ipsum, facilis veniam nostrum debitis dolore at totam blanditiis vel accusantium sunt inventore dignissimos ad, explicabo mollitia facere. Officiis temporibus perspiciatis architecto obcaecati, et iure ducimus ab ratione placeat fugiat ipsa velit quam dolore. Vel suscipit ea similique optio pariatur reprehenderit dignissimos quidem adipisci nihil tempora reiciendis voluptas qui accusamus laboriosam, inventore beatae quam perferendis fugiat sint. Atque similique doloribus dignissimos unde! Quis eum nulla iste.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt odio nulla pariatur, sint totam natus facere ut necessitatibus temporibus error veritatis officiis fugit id hic repellat sed fuga aut adipisci fugiat aliquam similique eligendi voluptates saepe? Repudiandae nihil at blanditiis natus sapiente porro ducimus qui amet placeat ut nostrum, doloribus reiciendis doloremque quisquam neque impedit architecto ullam officia pariatur. Esse quidem, quo hic unde doloribus quisquam. Recusandae hic magnam provident ipsum porro molestiae, laboriosam qui aperiam itaque placeat eum iure atque vitae sit ipsa perspiciatis? Recusandae, obcaecati. Eaque molestiae ipsam, sequi fugiat vel cum enim corporis fuga maiores voluptatibus quam. A autem tenetur, quidem sequi laboriosam, id quos reprehenderit aspernatur corporis consequuntur enim aut, iusto voluptate. Optio dolores amet quae! Ipsam, soluta officia facilis, tenetur omnis laboriosam maxime rem culpa quas, consequuntur sapiente? Ex officia numquam dignissimos, in voluptatibus repellendus iste quam, voluptatem dolorem quaerat ullam harum earum quibusdam asperiores facilis consectetur. Inventore commodi at totam id et, hic deserunt, adipisci tempore minus esse soluta. Alias, molestiae! Atque doloremque quam perspiciatis doloribus id quisquam dolor quae corrupti unde, officiis maxime tempore blanditiis culpa illum laborum fugiat amet repellat iusto sint natus ea labore! Ex dignissimos quas amet alias similique ut incidunt saepe placeat, ducimus, ipsam cumque odio obcaecati eius? Minus iusto asperiores quam explicabo id necessitatibus dolorum obcaecati illo, dignissimos tempora alias voluptas unde nostrum voluptatum magnam nesciunt sapiente molestiae aut, vitae nemo ea atque saepe aspernatur? Laborum aspernatur modi possimus laudantium reprehenderit perferendis sunt delectus beatae rem quod voluptates fugiat dignissimos voluptas dolorum adipisci et quidem consectetur eligendi voluptate iste, odio sed natus! Nobis dolorem delectus sint sapiente laborum omnis illo quos accusamus laboriosam porro velit dignissimos vitae nihil veniam, quo tempora vero, exercitationem deleniti ratione ad. Quis non nobis amet beatae rem magni, cum ex dolores esse repellat accusamus, accusantium facere neque suscipit natus sapiente quo nostrum modi! Itaque sit, laboriosam, vero, minus sint tenetur obcaecati nulla consectetur voluptate impedit dolorum ipsam! Sunt, sit! Quod maiores eveniet aliquam ipsam, mollitia placeat eaque dignissimos doloribus iste repellendus officiis, fugiat esse totam fugit odio itaque!
                            </p>
                        </div>
                    </div>

                </section>
            </Container>
        </>
    )
}

export default Test
