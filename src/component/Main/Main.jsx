import React from 'react';



import './Main.css';

class Main extends React.Component{
    render(){
        return(
            <main className = "main-wrapper">
                <article className = "article-wrapper">
                    <section className="photo-sections">
                        <img src="/mobile2.png" alt="Phone" id="img1"/>
                    </section>
                    <section className="disc-sections">
                        <div className="discription-site-wrapper">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore autem quod ipsam vitae eos recusandae dolorem vel ut quam reprehenderit, deserunt illo quas, dolorum impedit perspiciatis possimus nemo sapiente quae?
                                Deleniti voluptatibus facilis repellendus enim nihil distinctio explicabo itaque voluptatum! Quo reiciendis facilis blanditiis itaque, animi quaerat maiores et saepe molestias reprehenderit, iste incidunt necessitatibus tempore nam alias quis. Nemo.
                                Eaque iusto officiis facilis sit quod officia laudantium odit atque non incidunt, omnis mollitia? Quia voluptate accusamus blanditiis nostrum deleniti iste, corrupti quam dolorum, eligendi sit laudantium omnis ratione ipsam.
                                Modi reprehenderit optio libero ducimus nemo! At perferendis veritatis ipsa iure incidunt deleniti vel ad molestiae rerum distinctio saepe, voluptatem, aperiam odio sed adipisci error quas quaerat, officiis eius laborum?
                            </p>
                        </div>
                    </section>    
                </article>
            </main>
        )
    }
}

export default Main;