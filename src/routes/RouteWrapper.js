const RouteWrapper = props => {
    const { Component, Layout } = props;
    return (
        <>
            <Layout>
                <Component {...props} />
            </Layout>
        </>
    );
}

export default RouteWrapper