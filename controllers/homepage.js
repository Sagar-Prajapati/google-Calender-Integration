export const homePage = async(req,res)=>{
  res.render('index',{
    pageTitle:'YIES TASK',
    path:'/'
});
}