import React, {Component} from 'react';
import { Card,Button,Icon,Table,Modal} from 'antd';
import { connect } from 'react-redux';
import { getCategories ,addCategory ,updateCategory} from '@redux/action-creators';

import AddCategoryForm from './add-category-form';
import UpdateCategoryForm from  './update-category-form';
// import DeleteCategoryForm from  './delete-category-form';

@connect(
    (state)=>({categories: state.categories}),
    { getCategories,addCategory ,updateCategory}
)
 class Category  extends Component {
    state={
        isShowAddCategoryModal:false,
        isShowUpdateCategoryModal:false,
        // isShowDeleteCategoryModal:false,
        category: {}
    };


    addCategoryForm=React.createRef();
    updateCategoryForm=React.createRef();
    // deleteCategoryForm=React.createRef();


    columns= [
        {
            title:'品类名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            // dataIndex: 'operation',删除不要，和前面的name有冲突，会出错
            render: (category) => {
                return <div>
                    <Button type="link" onClick={this.showUpdateCategoryModal(category)}>修改分类</Button>
                    {/*<Button type="link" onClick={this.showDeleteCategoryModal(category)}>删除分类</Button>*/}
                    <Button type="link" >删除分类</Button>
                </div>
            }
        }
    ];
    showUpdateCategoryModal= (category) => {
        return () => {
            this.setState({
                isShowUpdateCategoryModal: true,
                category
            })
        }
    };

    // showDeleteCategoryModal= (category) => {
    //     return () => {
    //         this.setState({
    //             isShowDeleteCategoryModal:true,
    //             category
    //         })
    //     }
    // };

    componentDidMount() {
        this.props.getCategories();
    }

    switchModal= (value) => {
        return () => {
            this.setState(
                {
                    isShowAddCategoryModal:value
                }
            )
        }
    };
    addCategory= () => {
        const form = this.addCategoryForm.current;
        form.validateFields((err,values) => {
            if(!err){
                this.props.addCategory(values.categoryName);
                form.resetFields();
                this.setState({
                    isShowAddCategoryModal:false
                })
            }
        })
    };
    updateCategory= () => {
        const form = this.updateCategoryForm.current;
        form.validateFields((err,values) => {
            if(!err){
                this.props.updateCategory(this.state.category._id,values.categoryName);
                form.resetFields();
                this.setState({
                    isShowUpdateCategoryModal:false
                })
            }
        })
    };
    // deleteCategory= () => {
    //     const form=this.deleteCategoryForm.current;
    //     form.validateFields((err,values) => {
    //         if(!err){
    //             this.props.deleteCategory(values.categoryId);
    //             this.setState({
    //                 isShowUpdateCategoryModal:false
    //             })
    //         }
    //     })
    // };
    hiddenUpdateCategoryModal= () => {
        this.setState({
            isShowUpdateCategoryModal: false
        })
        // 清空表单数据
        this.updateCategoryForm.current.resetFields();
    };
    // hiddenDeleteCategoryModal= () => {
    //     this.setState({
    //         isShowUpdateCategoryModal: false
    //     })
    // };
    render() {
        const { categories } =this.props;
        const { isShowAddCategoryModal ,isShowUpdateCategoryModal,category} =this.state;
        return <Card title="分类列表" extra={<Button type="primary" onClick={this.switchModal(true)}><Icon type="plus"/>分类列表</Button>}>
            <Table
                columns={this.columns}
                dataSource={categories}
                bordered
                rowKey="_id"
                pagination={{
                    showQuickJumper: true,
                    showSizeChanger: true,
                    pageSizeOptions: ['3', '6', '9', '12'],
                    defaultPageSize: 3
                }}
            />

            <Modal
                visible={isShowAddCategoryModal}
                title="添加分类"
                onOk={this.addCategory}
                okText="确认"
                cancelText="取消"
                width={300}
                onCancel={this.switchModal(false)}
            >
                <AddCategoryForm ref={this.addCategoryForm}/>
            </Modal>
            <Modal
                visible={isShowUpdateCategoryModal}
                title="修改分类"
                onOk={this.updateCategory}
                okText="确认"
                cancelText="取消"
                width={300}
                onCancel={this.hiddenUpdateCategoryModal}
            >
                <UpdateCategoryForm ref={this.updateCategoryForm} categoryName={category.name}/>
            </Modal>

            {/*<Modal*/}
                {/*visible={isShowDeleteCategoryModal}*/}
                {/*title="删除分类"*/}
                {/*onOk={this.deleteCategory}*/}
                {/*okText="确认"*/}
                {/*cancelText="取消"*/}
                {/*width={300}*/}
                {/*onCancel={this.hiddenDeleteCategoryModal}*/}
            {/*>*/}
                {/*<DeleteCategoryForm ref={this.deleteCategoryForm} />*/}
            {/*</Modal>*/}
        </Card>;
    }
}
export default Category;